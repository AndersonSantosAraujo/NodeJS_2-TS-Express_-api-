import * as signIn from "./signIn.controller";
import * as signUp from "./signUp.controller";

export const usersController = {
  ...signIn,
  ...signUp,
};
