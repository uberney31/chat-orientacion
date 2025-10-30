"""
Custom FastAPI server with CORS configuration for Railway deployment
"""
import os
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import json

# Get environment variables
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
PORT = int(os.getenv('PORT', 8000))

print("=" * 80)
print("🚀 Starting Orientational Agent Server")
print("=" * 80)
print(f"📍 Frontend URL (CORS): {FRONTEND_URL}")
print(f"🔌 Port: {PORT}")
print(f"🤖 OpenAI Key configured: {'✅' if os.getenv('OPENAI_API_KEY') else '❌'}")
print("=" * 80)

# Create FastAPI app
app = FastAPI(title="Orientational Agent API")

# Configure CORS middleware FIRST (before routes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "https://chat-orientacion.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Import ADK agent after app creation
from orientational_agent.agent import root_agent
from google.adk.sessions import InMemorySessionService

# Create session service
session_service = InMemorySessionService()

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Orientational Agent API", "status": "running"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "frontend_url": FRONTEND_URL,
        "openai_configured": bool(os.getenv('OPENAI_API_KEY'))
    }

@app.post("/apps/{app_name}/users/{user_id}/sessions")
async def create_session(app_name: str, user_id: str):
    """Create a new chat session"""
    try:
        session = await session_service.create(
            app_name=app_name,
            user_id=user_id
        )
        return session.model_dump()
    except Exception as e:
        print(f"❌ Error creating session: {e}")
        return Response(
            content=json.dumps({"error": str(e)}),
            status_code=500,
            media_type="application/json"
        )

@app.get("/apps/{app_name}/users/{user_id}/sessions/{session_id}")
async def get_session(app_name: str, user_id: str, session_id: str):
    """Get an existing session"""
    try:
        session = await session_service.get(
            app_name=app_name,
            user_id=user_id,
            session_id=session_id
        )
        return session.model_dump()
    except Exception as e:
        print(f"❌ Error getting session: {e}")
        return Response(
            content=json.dumps({"error": str(e)}),
            status_code=404,
            media_type="application/json"
        )

@app.post("/run")
async def run_agent(request: Request):
    """Run the agent (non-streaming)"""
    try:
        body = await request.json()
        app_name = body.get("app_name")
        user_id = body.get("user_id")
        session_id = body.get("session_id")
        new_message = body.get("new_message")
        
        # Get session
        session = await session_service.get(app_name, user_id, session_id)
        
        # Run agent
        response = await root_agent.run(new_message, session=session)
        
        # Save session
        await session_service.save(session)
        
        return response.model_dump()
    except Exception as e:
        print(f"❌ Error running agent: {e}")
        return Response(
            content=json.dumps({"error": str(e)}),
            status_code=500,
            media_type="application/json"
        )

@app.post("/run_sse")
async def run_agent_streaming(request: Request):
    """Run the agent with Server-Sent Events streaming"""
    try:
        body = await request.json()
        app_name = body.get("app_name")
        user_id = body.get("user_id")
        session_id = body.get("session_id")
        new_message = body.get("new_message")
        
        print(f"📨 Received message for session {session_id}")
        
        # Get session
        session = await session_service.get(app_name, user_id, session_id)
        
        async def event_generator():
            """Generate SSE events"""
            try:
                async for event in root_agent.run_stream(new_message, session=session):
                    # Send event as SSE
                    event_data = event.model_dump()
                    yield f"data: {json.dumps(event_data)}\n\n"
                
                # Save session after stream completes
                await session_service.save(session)
                
            except Exception as e:
                print(f"❌ Error in streaming: {e}")
                error_event = {"error": str(e)}
                yield f"data: {json.dumps(error_event)}\n\n"
        
        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
        
    except Exception as e:
        print(f"❌ Error in run_sse: {e}")
        return Response(
            content=json.dumps({"error": str(e)}),
            status_code=500,
            media_type="application/json"
        )

if __name__ == "__main__":
    import uvicorn
    print(f"\n🎯 Starting server on 0.0.0.0:{PORT}")
    uvicorn.run(app, host="0.0.0.0", port=PORT, log_level="info")
