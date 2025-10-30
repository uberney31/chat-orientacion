'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Skill } from '@/types/cv';
import { Save, Loader2 } from 'lucide-react';

interface SkillFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Skill;
  onSave: (data: Omit<Skill, 'id'>) => Promise<{ error: string | null }>;
}

export function SkillForm({ isOpen, onClose, initialData, onSave }: SkillFormProps) {
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: initialData?.name || '',
    level: initialData?.level || 50,
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
        name: '',
        level: 50,
      });
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'Editar Habilidad' : 'Agregar Habilidad'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre de la habilidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Habilidad *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Ej: Programación, Inglés, Comunicación..."
          />
        </div>

        {/* Nivel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nivel de Dominio: {formData.level}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={formData.level}
            onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          
          {/* Indicador visual */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${formData.level}%` }}
              />
            </div>
          </div>
          
          {/* Referencias */}
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>Básico</span>
            <span>Intermedio</span>
            <span>Avanzado</span>
            <span>Experto</span>
          </div>
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

