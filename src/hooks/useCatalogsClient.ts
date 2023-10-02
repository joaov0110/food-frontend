import httpClient from "../config/axios";
import errorMessage from "../utils/errorMessage";
import { Icatalog, IcreateCatalog } from "../interfaces/catalogInterface";

const prefix = "/catalogs";

const useCatalogs = () => {
  const getCatalog = async (catalog_id: number): Promise<Icatalog> => {
    try {
      const { data } = await httpClient.get<Icatalog>(
        `${prefix}/catalog/${catalog_id}`
      );

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };

  const getCatalogsByPoint = async (point_id: string): Promise<Icatalog[]> => {
    try {
      const { data } = await httpClient.get<Icatalog[]>(
        `${prefix}/point/${point_id}`
      );

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };

  const getCatalogsByTenant = async (): Promise<Icatalog[]> => {
    try {
      const { data } = await httpClient.get<Icatalog[]>(`${prefix}/tenant`);

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };

  const createCatalog = async (payload: IcreateCatalog): Promise<any> => {
    try {
      const { data } = await httpClient.post(`${prefix}/catalog`, {
        ...payload,
      });

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err.response.data));
    }
  };

  return {
    getCatalog,
    getCatalogsByPoint,
    getCatalogsByTenant,
    createCatalog,
  };
};

export default useCatalogs;
