import { ZodSchema } from "zod";

const zValidator = (args: { schema: ZodSchema }) => {
  return async (innerArgs: { request: Request }) => {
    const formData = await innerArgs.request.formData();

    const parsed = args.schema.safeParse(formData);

    // if (!parsed.success) {
    //   return json({ errors: parsed.error.flatten() }, { status: 400 });
    // }

    return parsed.data;
  };
};

export { zValidator };