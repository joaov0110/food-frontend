import httpClient from "../config/axios";
import errorMessage from "../utils/errorMessage";
import { IPoint, InewPoint } from "../interfaces/pointInterface";

const prefix = "/points";

const usePoints = () => {
  const fetchPoint = async (point_id: number): Promise<IPoint> => {
    try {
      const { data } = await httpClient.get<IPoint>(`${prefix}/${point_id}`);

      return data;
    } catch (err) {
      throw new Error(errorMessage(err));
    }
  };

  const fetchPoints = async (): Promise<IPoint[]> => {
    try {
      const { data } = await httpClient.get<IPoint[]>(`${prefix}`);

      return data;
    } catch (err) {
      throw new Error(errorMessage(err));
    }
  };

  const createPoint = async (payload: InewPoint): Promise<any> => {
    try {
      const { data } = await httpClient.post(`${prefix}/point`, {
        ...payload,
        tenant_id: 6,
      });

      return data;
    } catch (err) {
      throw new Error(errorMessage(err));
    }
  };

  return {
    fetchPoint,
    fetchPoints,
    createPoint,
  };
};

export default usePoints;
