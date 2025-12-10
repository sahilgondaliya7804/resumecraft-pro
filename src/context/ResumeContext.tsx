import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  theme: 'modern' | 'classic' | 'minimal';
}

type ResumeAction =
  | { type: 'SET_PERSONAL_INFO'; payload: PersonalInfo }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: Experience }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: Education }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'SET_SKILLS'; payload: string[] }
  | { type: 'SET_THEME'; payload: ResumeData['theme'] }
  | { type: 'LOAD_DATA'; payload: ResumeData };

const initialState: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  theme: 'modern',
};

const STORAGE_KEY = 'resume-builder-data';

function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return { ...state, personalInfo: action.payload };
    case 'ADD_EXPERIENCE':
      return { ...state, experiences: [...state.experiences, action.payload] };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        ),
      };
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.filter((exp) => exp.id !== action.payload),
      };
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? action.payload : edu
        ),
      };
    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
      };
    case 'SET_SKILLS':
      return { ...state, skills: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeData;
  dispatch: React.Dispatch<ResumeAction>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_DATA', payload: parsed });
      } catch (e) {
        console.error('Failed to parse saved resume data:', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
