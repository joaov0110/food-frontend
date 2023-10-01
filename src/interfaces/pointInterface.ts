import { Iaddress } from "./addressInterface";

export interface IPoint {
  id: number;
  name: string;
  email: string;
  phone: string;
  image_url?: string | null;
  bgImage_url?: string | null;
  created_at: Date;
  updated_at: Date | null;
  address: Iaddress | null;
}

export interface IcreatePoint {
  name: string;
  email: string;
  phone: string;
}

export interface IupdatePoint {
  point_id: string;
  name: string;
  email: string;
  phone: string;
  address: Omit<Iaddress, "created_at" | "updated_at">;
}

export interface IupdatePointFormValues
  extends Omit<Iaddress, "created_at" | "updated_at"> {
  name: string;
  email: string;
  phone: string;
}
