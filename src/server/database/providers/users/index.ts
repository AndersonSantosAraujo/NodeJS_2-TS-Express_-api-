import * as create from "./create.provider";
import * as getAll from "./getByEmail.provider";

export const usersProvider = {
  ...create,
  ...getAll,
};
