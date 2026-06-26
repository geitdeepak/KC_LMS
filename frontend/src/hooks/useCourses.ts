import { useQuery } from "@tanstack/react-query";

import { getCourses } from "../services/courseService";

import type { Course } from "../types/course";

export const useCourses = () => {

  return useQuery<Course[]>({

    queryKey: ["courses"],

    queryFn: getCourses

  });

};