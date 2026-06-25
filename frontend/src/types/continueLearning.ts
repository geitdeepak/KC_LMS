export interface ContinueLearning {
  courseId: string;

  courseTitle: string;

  thumbnailUrl: string;

  moduleId: string;

  moduleTitle: string;

  lessonId: string;

  lessonTitle: string;

  lessonType: string;

  progress: number;

  completedLessons: number;

  totalLessons: number;

  isCourseCompleted: boolean;
}