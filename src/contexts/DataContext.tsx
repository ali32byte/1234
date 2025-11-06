import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentReport } from '../types';
import { mockStudentData } from '../data/mockData';

interface DataContextType {
  studentData: StudentReport;
  updateStudentData: (data: Partial<StudentReport>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [studentData, setStudentData] = useState<StudentReport>(() => {
    const saved = localStorage.getItem('studentData');
    return saved ? JSON.parse(saved) : mockStudentData;
  });

  const updateStudentData = (data: Partial<StudentReport>) => {
    setStudentData(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('studentData', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem('studentData', JSON.stringify(studentData));
  }, [studentData]);

  return (
    <DataContext.Provider value={{ studentData, updateStudentData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
