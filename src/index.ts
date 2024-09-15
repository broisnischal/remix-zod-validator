import { ZodSchema } from "zod";

const zValidator = (args: { schema: ZodSchema }) => {
  return async (innerArgs: { request: Request }) => {
    const formData = await innerArgs.request.formData();

    const parsed = args.schema.safeParse(formData);

    return parsed.data;
  };
};

export { zValidator };