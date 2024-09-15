import { ZodSchema } from "zod";

const zValidator = (args: { schema: ZodSchema }) => {
  return async (innerArgs: { request: Request }) => {
    const formData = await innerArgs.request.formData();

    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    }); 
    
    const parsed = args.schema.safeParse(formData);

    if(!parsed.success) {
      return {
        errors: parsed.error.flatten().fieldErrors,
        data: null
      }
    }

    return parsed.data;
  };
};

export { zValidator };