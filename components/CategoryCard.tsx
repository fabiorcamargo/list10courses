
import React from 'react';
import { CourseCheckbox } from './CourseCheckbox';
import { Category, Course } from '../types';

interface CategoryCardProps {
  category: Category;
  selectedCourses: Course[];
  onToggleCourse: (course: Course) => void;
  numberOfSelectedCourses: number;
  courseSelectionLimit: number; // Changed from number | null
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  selectedCourses,
  onToggleCourse,
  numberOfSelectedCourses,
  courseSelectionLimit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <h2 className="bg-sky-500 text-white p-4 text-xl font-semibold tracking-wide text-center">
        {category.title}
      </h2>
      <ul className="divide-y divide-gray-200 p-2 sm:p-4">
        {category.courses.map(course => (
          <CourseCheckbox
            key={course.id}
            course={course}
            isSelected={!!selectedCourses.find(c => c.id === course.id)}
            onToggle={() => onToggleCourse(course)}
            numberOfSelectedCourses={numberOfSelectedCourses}
            courseSelectionLimit={courseSelectionLimit}
          />
        ))}
      </ul>
    </div>
  );
};
