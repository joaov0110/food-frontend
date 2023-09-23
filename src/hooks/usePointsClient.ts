import httpClient from "../config/axios";
import errorMessage from "../utils/errorMessage";
import { IPoint } from "../interfaces/pointInterface";

const prefix = "/points";

const usePoints = () => {
  const fetchPoint = async (point_id: number): Promise<IPoint> => {
    console.log("Fetch point");
    try {
      const { data } = await httpClient.get<IPoint>(`${prefix}/${point_id}`);

      return data;
    } catch (err) {
      throw new Error(errorMessage(err));
    }
  };

  const fetchPoints = async (): Promise<IPoint[]> => {
    console.log("fetch points");
    try {
      const { data } = await httpClient.get<IPoint[]>(`${prefix}`);

      return data;
    } catch (err) {
      throw new Error(errorMessage(err));
    }
  };

  return {
    fetchPoint,
    fetchPoints,
  };
};

export default usePoints;
