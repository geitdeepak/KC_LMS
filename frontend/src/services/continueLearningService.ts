import api from "../api/axios";

import type {
  ContinueLearning
} from "../types/continueLearning";

export const getContinueLearning =
  async (): Promise<ContinueLearning> => {

    const userId =
      localStorage.getItem("userId");

    const response =
      await api.get<ContinueLearning>(
        `/Progress/continue-learning/${userId}`
      );

    return response.data;
  };