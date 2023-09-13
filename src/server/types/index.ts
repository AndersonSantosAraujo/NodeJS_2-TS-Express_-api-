import { RequestHandler } from "express";
import { AnyObject, Maybe, ObjectSchema } from "yup";

export type TProperty = "body" | "header" | "params" | "query";

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetSchema = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>
) => ObjectSchema<T>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

export type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;
