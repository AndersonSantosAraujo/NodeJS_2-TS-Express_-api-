import * as create from "./create.controller";
import * as getAll from "./get-all.controller";
import * as getById from "./get-by-id.controller";
import * as deleteById from "./detele-by-id.controller";
import * as updateById from "./update-by-id.controller";

export const citiesController = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById,
};
