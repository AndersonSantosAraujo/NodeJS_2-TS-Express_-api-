import { ICity } from "../../../interfaces";

declare module "knex/types/tables" {
  interface Tables {
    city: ICity;
    // people: IPeople
    // user: IUser
  }
}
