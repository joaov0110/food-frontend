import httpClient from "../config/axios";
import errorMessage from "../utils/errorMessage";
import { IPoint, InewPoint } from "../interfaces/pointInterface";

const prefix = "/points";

const usePoints = () => {
  const fetchPoint = async (point_id: number): Promise<IPoint> => {
    try {
      const { data } = await httpClient.get<IPoint>(`${prefix}/${point_id}`);

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };

  const fetchPoints = async (): Promise<IPoint[]> => {
    try {
      const { data } = await httpClient.get<IPoint[]>(`${prefix}`);

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };

  const createPoint = async (payload: InewPoint): Promise<any> => {
    try {
      const { data } = await httpClient.post(`${prefix}/point`, {
        ...payload,
        tenant_id: 6,
      });

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };

  const updatePointProfilePicture = async (
    formData: FormData
  ): Promise<any> => {
    try {
      const data = await httpClient.put(
        `${prefix}/point/profileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };

  const updatePointBgImage = async (formData: FormData): Promise<any> => {
    try {
      const data = await httpClient.put(`${prefix}/point/bgImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };
  return {
    fetchPoint,
    fetchPoints,
    createPoint,
    updatePointProfilePicture,
    updatePointBgImage,
  };
};

export default usePoints;
