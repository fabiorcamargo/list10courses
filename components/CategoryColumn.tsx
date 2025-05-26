
import React from 'react';
import { CategoryCard } from './CategoryCard';
import { Category, Course } from '../types';

interface CategoryColumnProps {
  categories: Category[];
  selectedCourses: Course[];
  onToggleCourse: (course: Course) => void;
  numberOfSelectedCourses: number;
  courseSelectionLimit: number; // Changed from number | null
}

export const CategoryColumn: React.FC<CategoryColumnProps> = ({
  categories,
  selectedCourses,
  onToggleCourse,
  numberOfSelectedCourses,
  courseSelectionLimit,
}) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
          selectedCourses={selectedCourses}
          onToggleCourse={onToggleCourse}
          numberOfSelectedCourses={numberOfSelectedCourses}
          courseSelectionLimit={courseSelectionLimit}
        />
      ))}
    </div>
  );
};
