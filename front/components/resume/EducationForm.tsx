'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Education } from '@/types/cv';
import { Save, Loader2 } from 'lucide-react';

interface EducationFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Education;
  onSave: (data: Omit<Education, 'id'>) => Promise<{ error: string | null }>;
}

export function EducationForm({ isOpen, onClose, initialData, onSave }: EducationFormProps) {
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    degree: initialData?.degree || '',
    institution: initialData?.institution || '',
    year: initialData?.year || '',
    description: initialData?.description || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const result = await onSave(formData);
    setSaving(false);

    if (result.error) {
      setError(result.error);
    } else {
      onClose();
      // Reset form
      setFormData({
        degree: '',
        institution: '',
        year: '',
        description: '',
      });
    }
  };

  const handleChange = (field: keyof Omit<Education, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'Editar Educación' : 'Agregar Educación'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título/Grado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Título o Grado *
          </label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => handleChange('degree', e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Ej: Bachiller Académico, Licenciatura en..."
          />
        </div>

        {/* Institución */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Institución *
          </label>
          <input
            type="text"
            value={formData.institution}
            onChange={(e) => handleChange('institution', e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Ej: Universidad Nacional, Colegio..."
          />
        </div>

        {/* Año */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Año o Período *
          </label>
          <input
            type="text"
            value={formData.year}
            onChange={(e) => handleChange('year', e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Ej: 2020 - 2024, 2023"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Descripción *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            placeholder="Describe tu experiencia educativa, materias, logros..."
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {initialData ? 'Actualizar' : 'Agregar'}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

