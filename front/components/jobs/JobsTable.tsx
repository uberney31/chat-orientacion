import { Building2, MapPin, Calendar, Award } from "lucide-react";

interface Job {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
  achievements: string[];
}

interface JobsTableProps {
  jobs: Job[];
}

/**
 * Tabla/Lista de experiencia laboral
 * Muestra trabajos en formato de cards responsivas
 */
export function JobsTable({ jobs }: JobsTableProps) {
  return (
    <div className="space-y-6">
      {jobs.map((job, index) => (
        <div
          key={job.id}
          className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Header del trabajo */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {job.position}
              </h3>
              
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Badge del tipo */}
            <div className="flex-shrink-0">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {job.type}
              </span>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {job.description}
          </p>

          {/* Logros */}
          {job.achievements.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Logros destacados:
                </h4>
              </div>
              <ul className="space-y-2">
                {job.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* Mensaje si no hay trabajos */}
      {jobs.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No hay experiencia laboral registrada aún
          </p>
        </div>
      )}
    </div>
  );
}

