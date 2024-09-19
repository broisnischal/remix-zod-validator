import { z, ZodEffects, ZodString, ZodTypeAny } from "zod";

type InputType<DefaultType extends ZodTypeAny> = {
  (): ZodEffects<DefaultType>;
  <ProvidedType extends ZodTypeAny>(
    schema: ProvidedType
  ): ZodEffects<ProvidedType>;
};

const stripEmpty = z.literal("").transform(() => undefined);

const preprocessIfValid = (schema: ZodTypeAny) => (val: unknown) => {
  const result = schema.safeParse(val);
  if (result.success) return result.data;
  return val;
};

/**
 * Transforms any empty strings to `undefined` before validating.
 * This makes it so empty strings will fail required checks,
 * allowing you to use `optional` for optional fields instead of `nonempty` for required fields.
 * If you call `zfd.text` with no arguments, it will assume the field is a required string by default.
 * If you want to customize the schema, you can pass that as an argument.
 */
export const text: InputType<ZodString> = (schema = z.string()) =>
  z.preprocess(preprocessIfValid(stripEmpty), schema) as any;
