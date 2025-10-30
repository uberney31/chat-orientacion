'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';
import { CVData, PersonalInfo, Education, Skill } from '@/types/cv';

const STORAGE_KEY = 'user_cv_data';

export function useCV() {
  const { user } = useAuth();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firestoreEnabled, setFirestoreEnabled] = useState(true);

  // Cargar CV del usuario - Firestore primero, localStorage como respaldo
  useEffect(() => {
    const loadCV = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const storageKey = `${STORAGE_KEY}_${user.uid}`;
      
      try {
        // INTENTO 1: Cargar desde Firestore
        console.log('📡 Intentando cargar desde Firestore...');
        const cvRef = doc(db, 'users', user.uid, 'cv', 'data');
        const cvSnap = await getDoc(cvRef);

        if (cvSnap.exists()) {
          console.log('✅ Datos cargados desde Firestore');
          const firestoreData = cvSnap.data() as CVData;
          setCvData(firestoreData);
          // Guardar también en localStorage como respaldo
          localStorage.setItem(storageKey, JSON.stringify(firestoreData));
          setFirestoreEnabled(true);
          setError(null);
        } else {
          console.log('📝 No hay datos en Firestore, creando datos por defecto');
          // No existe en Firestore, intentar crear
          const defaultCV = getDefaultCVData(user);
          
          try {
            await setDoc(cvRef, defaultCV);
            console.log('✅ Datos guardados en Firestore');
            setCvData(defaultCV);
            localStorage.setItem(storageKey, JSON.stringify(defaultCV));
            setFirestoreEnabled(true);
          } catch (saveError: any) {
            console.warn('⚠️ No se pudo guardar en Firestore:', saveError.message);
            setCvData(defaultCV);
            localStorage.setItem(storageKey, JSON.stringify(defaultCV));
            setFirestoreEnabled(false);
          }
        }
        setError(null);
      } catch (err: any) {
        // INTENTO 2: Si Firestore falla, usar localStorage
        console.warn('❌ Firestore no disponible:', err.message);
        console.log('💾 Usando localStorage como respaldo...');
        setFirestoreEnabled(false);
        
        try {
          const savedData = localStorage.getItem(storageKey);
          
          if (savedData) {
            console.log('✅ Datos cargados desde localStorage');
            const parsedData = JSON.parse(savedData);
            setCvData(parsedData);
          } else {
            console.log('📝 Creando datos por defecto en localStorage');
            const defaultCV = getDefaultCVData(user);
            setCvData(defaultCV);
            localStorage.setItem(storageKey, JSON.stringify(defaultCV));
          }
          setError(null);
        } catch (localErr: any) {
          console.error('❌ Error con localStorage:', localErr);
          const defaultCV = getDefaultCVData(user);
          setCvData(defaultCV);
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCV();
  }, [user]);

  // Helper para guardar en localStorage Y Firestore
  const saveData = async (data: CVData) => {
    if (!user) return;
    
    // 1. Guardar en localStorage (inmediato, siempre funciona)
    try {
      const storageKey = `${STORAGE_KEY}_${user.uid}`;
      localStorage.setItem(storageKey, JSON.stringify(data));
      console.log('💾 Guardado en localStorage');
    } catch (err) {
      console.error('❌ Error saving to localStorage:', err);
    }

    // 2. Intentar guardar en Firestore (si está disponible)
    if (firestoreEnabled) {
      try {
        const cvRef = doc(db, 'users', user.uid, 'cv', 'data');
        await setDoc(cvRef, data, { merge: true });
        console.log('✅ Guardado en Firestore');
      } catch (err: any) {
        console.warn('⚠️ No se pudo guardar en Firestore:', err.message);
        // Desactivar Firestore si falla
        setFirestoreEnabled(false);
      }
    }
  };

  // Actualizar información personal
  const updatePersonalInfo = async (personalInfo: PersonalInfo) => {
    if (!user || !cvData) return { error: 'Usuario no autenticado' };

    // Actualizar datos
    const updatedData = { ...cvData, personalInfo };
    setCvData(updatedData);
    await saveData(updatedData);
    
    return { error: null };
  };

  // Actualizar resumen
  const updateSummary = async (summary: string) => {
    if (!user || !cvData) return { error: 'Usuario no autenticado' };

    // Actualizar datos
    const updatedData = { ...cvData, summary };
    setCvData(updatedData);
    await saveData(updatedData);
    
    return { error: null };
  };

  // Actualizar educación
  const updateEducation = async (education: Education[]) => {
    if (!user || !cvData) return { error: 'Usuario no autenticado' };

    // Actualizar datos
    const updatedData = { ...cvData, education };
    setCvData(updatedData);
    await saveData(updatedData);
    
    return { error: null };
  };

  // Agregar educación
  const addEducation = async (edu: Omit<Education, 'id'>) => {
    if (!user || !cvData) return { error: 'Usuario no autenticado' };

    const newEducation: Education = {
      ...edu,
      id: `edu_${Date.now()}`,
    };

    const updatedEducation = [...cvData.education, newEducation];
    return await updateEducation(updatedEducation);
  };

  // Eliminar educación
  const removeEducation = async (id: string) => {
    if (!user || !cvData) return { error: 'Usuario no autenticado' };

    const updatedEducation = cvData.education.filter((edu) => edu.id !== id);
    return await updateEducation(updatedEducation);
  };

  // Actualizar habilidades
  const updateSkills = async (skills: Skill[]) => {
    if (!user || !cvData) return { error: 'Usuario no autenticado' };

    // Actualizar datos
    const updatedData = { ...cvData, skills };
    setCvData(updatedData);
    await saveData(updatedData);
    
    return { error: null };
  };

  // Agregar habilidad
  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    if (!user || !cvData) return { error: 'Usuario no autenticado' };

    const newSkill: Skill = {
      ...skill,
      id: `skill_${Date.now()}`,
    };

    const updatedSkills = [...cvData.skills, newSkill];
    return await updateSkills(updatedSkills);
  };

  // Eliminar habilidad
  const removeSkill = async (id: string) => {
    if (!user || !cvData) return { error: 'Usuario no autenticado' };

    const updatedSkills = cvData.skills.filter((skill) => skill.id !== id);
    return await updateSkills(updatedSkills);
  };

  return {
    cvData,
    loading,
    error,
    updatePersonalInfo,
    updateSummary,
    updateEducation,
    addEducation,
    removeEducation,
    updateSkills,
    addSkill,
    removeSkill,
  };
}

// Datos por defecto basados en el usuario de Firebase
function getDefaultCVData(user: any): CVData {
  return {
    personalInfo: {
      name: user.displayName || "Usuario",
      title: "Estudiante",
      email: user.email || "",
      phone: "+57 300 000 0000",
      location: "Colombia",
      avatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
    },
    summary: "Completa tu resumen profesional aquí. Describe tus objetivos, habilidades y lo que te apasiona.",
    education: [],
    skills: [],
  };
}

