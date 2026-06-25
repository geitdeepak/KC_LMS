import api from "../api/axios";

import type {
  CertificateDto
} from "../types/certificate";

export const getMyCertificates =
  async (): Promise<
    CertificateDto[]
  > => {

    const response =
      await api.get<
        CertificateDto[]
      >(
        "/Certificates/my"
      );

    return response.data;
  };