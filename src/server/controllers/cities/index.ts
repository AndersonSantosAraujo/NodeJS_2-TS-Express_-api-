import * as create from "./create.controller";
import * as getAll from "./getAll.controller";
import * as getById from "./getById.controller";
import * as deleteById from "./deleteById.controller";
import * as updateById from "./updateById.controller";

export const citiesController = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById,
};
