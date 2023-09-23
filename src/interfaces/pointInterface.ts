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

export interface InewPoint {
  name: string;
  email: string;
  phone: string;
}
