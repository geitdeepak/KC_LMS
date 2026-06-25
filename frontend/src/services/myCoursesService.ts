import api from "../api/axios";

import type {
  MyCourse
} from "../types/myCourse";

export const getMyCourses =
  async (): Promise<MyCourse[]> => {

    const userId =
      localStorage.getItem("userId");

    const response =
      await api.get<MyCourse[]>(
        `/Progress/my-courses/${userId}`
      );

    return response.data;

  };