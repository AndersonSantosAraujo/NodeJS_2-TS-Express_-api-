import * as create from "./create.provider";
import * as getAll from "./getAll.provider";
import * as getById from "./getById.provider";
import * as deleteById from "./delete.provider";
import * as updateById from "./update.provider";
import * as count from "./count.provider";

export const citiesProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById,
  ...count,
};
