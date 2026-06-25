import api from "../api/axios";
import type { LearnerDashboard }
  from "../types/dashboard";

export const getLearnerDashboard =
  async (): Promise<LearnerDashboard> => {
    const response =
      await api.get<LearnerDashboard>(
        "/Learner/dashboard"
      );

    return response.data;
  };