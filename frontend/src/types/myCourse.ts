export interface MyCourse {

  id: string;

  title: string;

  description: string;

  category: string;

  level: string;

  thumbnailUrl: string;

  progress: number;

  completedLessons: number;

  totalLessons: number;

  isCompleted: boolean;

  certificateEarned: boolean;

  lastLessonTitle: string;

  enrolledAt: string;

}