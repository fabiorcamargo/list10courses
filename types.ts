
export interface Course {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  title: string;
  courses: Course[];
}
    