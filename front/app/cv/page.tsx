'use client';

import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Award, Book, Briefcase, Edit, Plus, Trash2 } from "lucide-react";
import { ResumeCard } from "@/components/resume/ResumeCard";
import { PersonalInfoForm } from "@/components/resume/PersonalInfoForm";
import { SummaryForm } from "@/components/resume/SummaryForm";
import { EducationForm } from "@/components/resume/EducationForm";
import { SkillForm } from "@/components/resume/SkillForm";
import { useCV } from "@/hooks/useCV";
import { useState } from "react";

/**
 * Página de CV - Conectada con Firebase Firestore
 */
export default function CVPage() {
  const { 
    cvData, 
    loading, 
    error, 
    updatePersonalInfo,
    updateSummary,
    addEducation,
    removeEducation, 
    addSkill,
    removeSkill 
  } = useCV();
  
  const [editMode, setEditMode] = useState(false);
  const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);
  const [showSummaryForm, setShowSummaryForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Cargando tu CV...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !cvData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-red-500 mb-4">{error || "Error al cargar el CV"}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { personalInfo, summary, education, skills } = cvData;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Mi Hoja de Vida
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Información personal y profesional
            </p>
          </div>
          
          <button
            onClick={() => setEditMode(!editMode)}
            className={`glass px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              editMode 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-blue-500 hover:text-white'
            }`}
          >
            <Edit className="w-4 h-4" />
            {editMode ? 'Vista Normal' : 'Modo Edición'}
          </button>
        </div>

        {/* Información Personal */}
        <ResumeCard
          title="Información Personal"
          icon={<Briefcase className="w-5 h-5" />}
        >
          <div className="flex flex-col md:flex-row gap-6 relative">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={personalInfo.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${personalInfo.name}`}
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {personalInfo.name}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {personalInfo.title}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>
            
            {/* Botón de editar */}
            {editMode && (
              <button
                onClick={() => setShowPersonalInfoForm(true)}
                className="absolute top-0 right-0 p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-opacity"
                title="Editar información personal"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
        </ResumeCard>

        {/* Resumen */}
        <ResumeCard title="Resumen Profesional" icon={<Award className="w-5 h-5" />}>
          <div className="relative">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {summary}
            </p>
            
            {/* Botón de editar */}
            {editMode && (
              <button
                onClick={() => setShowSummaryForm(true)}
                className="absolute top-0 right-0 p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-opacity"
                title="Editar resumen"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
        </ResumeCard>

        {/* Educación */}
        <ResumeCard title="Educación" icon={<Book className="w-5 h-5" />}>
          {education.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="mb-4">No has agregado educación aún</p>
              {editMode && (
                <button 
                  onClick={() => setShowEducationForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agregar educación
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-blue-500 pl-4 relative group">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                    {edu.year}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {edu.description}
                  </p>
                  
                  {editMode && (
                    <button 
                      onClick={() => removeEducation(edu.id)}
                      className="absolute top-0 right-0 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      title="Eliminar educación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              
              {editMode && (
                <button 
                  onClick={() => setShowEducationForm(true)}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agregar educación
                </button>
              )}
            </div>
          )}
        </ResumeCard>

        {/* Habilidades */}
        <ResumeCard title="Habilidades" icon={<Award className="w-5 h-5" />}>
          {skills.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="mb-4">No has agregado habilidades aún</p>
              {editMode && (
                <button 
                  onClick={() => setShowSkillForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agregar habilidad
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="relative group">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {skill.level}%
                      </span>
                      {editMode && (
                        <button 
                          onClick={() => removeSkill(skill.id)}
                          className="p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          title="Eliminar habilidad"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
              
              {editMode && (
                <button 
                  onClick={() => setShowSkillForm(true)}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agregar habilidad
                </button>
              )}
            </div>
          )}
        </ResumeCard>
      </div>
      
      {/* Formularios Modales */}
      <PersonalInfoForm
        isOpen={showPersonalInfoForm}
        onClose={() => setShowPersonalInfoForm(false)}
        initialData={personalInfo}
        onSave={updatePersonalInfo}
      />
      
      <SummaryForm
        isOpen={showSummaryForm}
        onClose={() => setShowSummaryForm(false)}
        initialSummary={summary}
        onSave={updateSummary}
      />
      
      <EducationForm
        isOpen={showEducationForm}
        onClose={() => setShowEducationForm(false)}
        onSave={addEducation}
      />
      
      <SkillForm
        isOpen={showSkillForm}
        onClose={() => setShowSkillForm(false)}
        onSave={addSkill}
      />
    </main>
  );
}

