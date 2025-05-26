
import React from 'react';
import { Course } from '../types';

interface CourseCheckboxProps {
  course: Course;
  isSelected: boolean;
  onToggle: () => void;
  numberOfSelectedCourses: number;
  courseSelectionLimit: number; // Changed from number | null
}

export const CourseCheckbox: React.FC<CourseCheckboxProps> = ({
  course,
  isSelected,
  onToggle,
  numberOfSelectedCourses,
  courseSelectionLimit,
}) => {
  // Simplified: courseSelectionLimit is always a number
  const isLimitReached = numberOfSelectedCourses >= courseSelectionLimit;
  const isDisabled = isLimitReached && !isSelected;

  return (
    <li className={`py-3 px-2 rounded-md transition-colors duration-150 ${isDisabled ? 'opacity-60' : 'hover:bg-sky-50'}`}>
      <label className={`flex items-center space-x-3 group ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          disabled={isDisabled}
          className={`form-checkbox h-5 w-5 text-sky-600 border-gray-300 rounded focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 transition-all duration-150 ${isDisabled ? 'cursor-not-allowed' : ''}`}
          aria-label={`Selecionar curso ${course.name}${isDisabled ? ' (limite de seleção atingido)' : ''}`}
        />
        <span className={`text-sm sm:text-base text-gray-700 ${!isDisabled ? 'group-hover:text-sky-700' : ''} ${isSelected ? 'font-medium text-sky-700' : ''}`}>
          {course.name}
        </span>
      </label>
    </li>
  );
};
