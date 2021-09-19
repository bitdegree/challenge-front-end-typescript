import { Address } from "./address.model";
import { BaseModel } from "./base.model";
import { Company } from "./company.model";

class User extends BaseModel {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export { User };
