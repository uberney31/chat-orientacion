import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JobsTable } from "@/components/jobs/JobsTable";

/**
 * Página de experiencia laboral - Muestra mockup de trabajos
 */
export default function JobsPage() {
  // Mock data de experiencia laboral
  const jobs = [
    {
      id: "1",
      position: "Desarrollador Junior (Práctica)",
      company: "TechStart Colombia",
      location: "Bogotá, Colombia",
      startDate: "Ene 2024",
      endDate: "Presente",
      type: "Práctica",
      description:
        "Desarrollo de aplicaciones web con React y Node.js. Participación en proyectos de automatización y mejora de procesos.",
      achievements: [
        "Implementé un sistema de gestión de usuarios",
        "Reduje el tiempo de carga de la aplicación en 30%",
        "Colaboré en el desarrollo de APIs REST",
      ],
    },
    {
      id: "2",
      position: "Tutor de Matemáticas",
      company: "Academia Brillante",
      location: "Remoto",
      startDate: "Mar 2023",
      endDate: "Dic 2023",
      type: "Medio tiempo",
      description:
        "Enseñanza de matemáticas a estudiantes de secundaria. Preparación de material didáctico y seguimiento académico.",
      achievements: [
        "Mejoré las calificaciones de mis estudiantes en un 25%",
        "Desarrollé material didáctico interactivo",
        "Atendí a más de 20 estudiantes durante el año",
      ],
    },
    {
      id: "3",
      position: "Voluntario Tecnológico",
      company: "ONG Educación Digital",
      location: "Bogotá, Colombia",
      startDate: "Jun 2022",
      endDate: "Feb 2023",
      type: "Voluntariado",
      description:
        "Apoyo en la enseñanza de habilidades digitales básicas a comunidades vulnerables.",
      achievements: [
        "Capacité a más de 100 personas en herramientas digitales",
        "Organicé talleres de programación para jóvenes",
        "Doné equipos tecnológicos restaurados",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Experiencia Laboral
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Historial de trabajos y logros profesionales
          </p>
        </div>

        {/* Tabla de trabajos */}
        <JobsTable jobs={jobs} />
      </div>
    </main>
  );
}

