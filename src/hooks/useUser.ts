import httpClient from "../config/axios";
import { useQuery } from "react-query";

const prefix = "/tenants";

interface Iaddress {
  postalCode: string;
  street: string;
  street_number: string;
  district: string;
  city: string;
  UF: string;
  created_at: Date;
  updated_at: Date | null;
}

interface IgetUser {
  id: number;
  name: string;
  document: string;
  email: string;
  accountant_name: string;
  accountant_email: string;
  accountant_phone: string;
  is_new_tenant: boolean;
  image_url: string | null;
  bgImage_url: string | null;
  created_at: Date;
  updated_at: Date | null;
  address: Iaddress | null;
}

const useUser = () => {
  const getUser = async (): Promise<IgetUser> => {
    try {
      const { data } = await httpClient.get(`${prefix}/tenant`);

      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return {
    user: useQuery<IgetUser, Error>({ queryKey: ["user"], queryFn: getUser }),
  };
};

export default useUser;
