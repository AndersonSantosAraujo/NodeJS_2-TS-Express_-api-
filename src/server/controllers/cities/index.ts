import * as create from "./create.controller";
import * as getAll from "./get-all.controller";

export const citiesController = {
  ...create,
  ...getAll,
};
