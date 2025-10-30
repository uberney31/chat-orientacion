import Link from "next/link";
import { FileText, Briefcase, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Orientación Profesional
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Descubre tu carrera ideal con ayuda de inteligencia artificial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card CV */}
          <Link href="/cv">
            <div className="glass rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-500 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Mi CV
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Revisa tu hoja de vida, educación y habilidades
                </p>
              </div>
            </div>
          </Link>

          {/* Card Jobs */}
          <Link href="/jobs">
            <div className="glass rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-500 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Experiencia
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Consulta tu historial laboral
                </p>
              </div>
            </div>
          </Link>

          {/* Card Chat */}
          <div className="glass rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-500 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Asesor IA
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Chatea con tu orientador virtual (esquina inferior derecha)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              ¿Cómo funciona?
            </h3>
            <ol className="text-left text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  1
                </span>
                <span>Abre el chat flotante en la esquina inferior derecha</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  2
                </span>
                <span>Responde las preguntas sobre tus intereses y habilidades</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  3
                </span>
                <span>Recibe recomendaciones personalizadas de carreras</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

