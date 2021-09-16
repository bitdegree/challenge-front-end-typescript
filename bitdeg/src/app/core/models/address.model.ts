import { Geo } from "@core/types";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  phone: string;
  website: string;
  geo: Geo;
}

export { Address };
