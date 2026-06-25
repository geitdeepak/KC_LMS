export interface MyCourse {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  progress: number;
}

export interface LessonProgressDto {
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface CourseLessonDto {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface ModuleDto {
  id: string;
  title: string;
  lessons: CourseLessonDto[];
}

export interface CourseDetailsDto {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  modules: ModuleDto[];
}

export interface LessonDto {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  lessonType: string;
  contentUrl: string;
  order: number;
  isPublished: boolean;
}