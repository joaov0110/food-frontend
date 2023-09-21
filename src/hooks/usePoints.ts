import httpClient from "../config/axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import errorMessage from "../utils/errorMessage";
import { IPoint } from "../interfaces/pointInterface";

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

  return {
    getPoint: fetchPoint,
    getPoints: useQuery<IPoint[], Error>({
      queryKey: ["points"],
      queryFn: fetchPoints,
    }),
  };
};

export default usePoints;
