import * as create from "./create.controller";
import * as getAll from "./getAll.controller";
import * as getById from "./getById.controller";
import * as deleteById from "./delete.controller";
import * as updateById from "./update.controller";

export const peopleController = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById,
};
