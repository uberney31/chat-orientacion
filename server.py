"""
Custom FastAPI server with CORS configuration for Railway deployment
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google.adk.cli.fast_api import create_adk_app
from orientational_agent.agent import root_agent

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

# Create ADK FastAPI app
app = create_adk_app(
    root_agent,
    app_name="orientational_agent"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],  # Allow both production and development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "frontend_url": FRONTEND_URL,
        "openai_configured": bool(os.getenv('OPENAI_API_KEY'))
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)

