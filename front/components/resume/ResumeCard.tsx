import { ReactNode } from "react";

interface ResumeCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Card reutilizable para mostrar secciones del CV
 */
export function ResumeCard({ title, icon, children }: ResumeCardProps) {
  return (
    <div className="glass rounded-2xl p-6 shadow-lg mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        {icon && (
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            {icon}
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

