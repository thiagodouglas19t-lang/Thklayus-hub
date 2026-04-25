import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, UserProgress } from '../types';

interface UserContextType {
  user: User | null;
  setUserName: (name: string) => void;
  startCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  getCourseProgress: (courseId: string) => UserProgress | undefined;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'kairos_user';

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const setUserName = (name: string) => {
    setUser(prev => ({
      name,
      email: prev?.email || '',
      progress: prev?.progress || []
    }));
  };

  const startCourse = (courseId: string) => {
    if (!user) return;
    
    const existingProgress = user.progress.find(p => p.courseId === courseId);
    if (existingProgress) return;

    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        progress: [
          ...prev.progress,
          {
            courseId,
            completedLessons: [],
            startedAt: new Date().toISOString()
          }
        ]
      };
    });
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return prev;
      
      const progressIndex = prev.progress.findIndex(p => p.courseId === courseId);
      
      if (progressIndex === -1) {
        return {
          ...prev,
          progress: [
            ...prev.progress,
            {
              courseId,
              completedLessons: [lessonId],
              currentLessonId: lessonId,
              startedAt: new Date().toISOString()
            }
          ]
        };
      }

      const updatedProgress = [...prev.progress];
      const current = updatedProgress[progressIndex];
      
      if (!current.completedLessons.includes(lessonId)) {
        updatedProgress[progressIndex] = {
          ...current,
          completedLessons: [...current.completedLessons, lessonId],
          currentLessonId: lessonId
        };
      }

      return { ...prev, progress: updatedProgress };
    });
  };

  const getCourseProgress = (courseId: string) => {
    return user?.progress.find(p => p.courseId === courseId);
  };

  const isLessonCompleted = (courseId: string, lessonId: string) => {
    const progress = getCourseProgress(courseId);
    return progress?.completedLessons.includes(lessonId) || false;
  };

  return (
    <UserContext.Provider value={{
      user,
      setUserName,
      startCourse,
      completeLesson,
      getCourseProgress,
      isLessonCompleted
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
