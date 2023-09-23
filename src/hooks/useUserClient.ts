import httpClient from "../config/axios";
import { useQueryClient } from "react-query";
import errorMessage from "../utils/errorMessage";
import { Iaddress } from "../interfaces/addressInterface";
const prefix = "/tenants";

interface Iuser {
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
}

export interface IgetUser extends Iuser {
  address: Iaddress | null;
}

export type updateUser = Omit<
  Iuser,
  "id" | "is_new_tenant" | "created_at" | "updated_at"
> &
  Omit<Iaddress, "created_at" | "updated_at">;

const useUser = () => {
  const fetchUser = async (): Promise<IgetUser> => {
    try {
      const { data } = await httpClient.get(`${prefix}/tenant`);

      return data;
    } catch (err: any) {
      throw new Error(errorMessage(err));
    }
  };

  const updateUser = async (payload: updateUser): Promise<string> => {
    const {
      name,
      document,
      email,
      accountant_name,
      accountant_email,
      accountant_phone,
      image_url,
      bgImage_url,
      postalCode,
      street,
      street_number,
      district,
      city,
      UF,
    } = payload;

    try {
      const { data } = await httpClient.put(`${prefix}/tenant`, {
        name,
        document,
        email,
        accountant_name,
        accountant_email,
        accountant_phone,
        image_url,
        bgImage_url,
        address: {
          postalCode,
          street,
          street_number,
          district,
          city,
          UF,
        },
      });
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return {
    fetchUser,
    updateUser,
  };
};

export default useUser;