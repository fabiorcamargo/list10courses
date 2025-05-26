
import React, { useState, useCallback, useEffect } from 'react';
import { AppHeader } from './components/AppHeader';
import { CategoryColumn } from './components/CategoryColumn';
import { SelectionSummary } from './components/SelectionSummary';
import { COURSE_CATEGORIES_COLUMN_1, COURSE_CATEGORIES_COLUMN_2 } from './constants';
import { Course } from './types';

const App: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [courseSelectionLimit, setCourseSelectionLimit] = useState<number>(10); // Default limit is 10

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const limitParam = params.get('limit');
    if (limitParam) {
      const parsedLimit = parseInt(limitParam, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        setCourseSelectionLimit(parsedLimit);
      }
      // If limitParam is present but invalid (e.g., 0, negative, or not a number),
      // the default of 10 (set in useState) will be used.
    }
  }, []);

  const toggleCourse = useCallback((course: Course) => {
    setSelectedCourses(prevSelected => {
      const isAlreadySelected = prevSelected.find(c => c.id === course.id);

      if (!isAlreadySelected) { // Trying to select a new course
        if (prevSelected.length >= courseSelectionLimit) {
          alert(`Você pode selecionar no máximo ${courseSelectionLimit} curso(s).`);
          return prevSelected; // Do not add the course
        }
        return [...prevSelected, course];
      } else { // Trying to deselect a course
        return prevSelected.filter(c => c.id !== course.id);
      }
    });
  }, [courseSelectionLimit]);

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <p className="text-center text-blue-600 font-semibold bg-blue-100 border border-blue-300 p-3 rounded-md mb-6 shadow">
          Atenção: Você pode selecionar no máximo {courseSelectionLimit} curso(s) para esta simulação.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <CategoryColumn
            categories={COURSE_CATEGORIES_COLUMN_1}
            selectedCourses={selectedCourses}
            onToggleCourse={toggleCourse}
            numberOfSelectedCourses={selectedCourses.length}
            courseSelectionLimit={courseSelectionLimit}
          />
          <CategoryColumn
            categories={COURSE_CATEGORIES_COLUMN_2}
            selectedCourses={selectedCourses}
            onToggleCourse={toggleCourse}
            numberOfSelectedCourses={selectedCourses.length}
            courseSelectionLimit={courseSelectionLimit}
          />
        </div>
        <SelectionSummary selectedCourses={selectedCourses} courseSelectionLimit={courseSelectionLimit} />
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        © ${new Date().getFullYear()} Profissionaliza Cursos. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;
