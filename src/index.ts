import { ZodSchema } from "zod";
import { text } from "./helper";

const zValidator = <T extends ZodSchema>(args: { schema: T }) => {
  return async (innerArgs: {
    request: Request;
  }): Promise<
    | {
        success: false;
        errors: Record<string, string[]>;
      }
    | {
        success: true;
        data: T;
      }
  > => {
    const formData = await innerArgs.request.formData();

    console.log(formData);

    const formObject: Record<string, any> = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    console.log(formObject);

    const parsed = args.schema.safeParse(formObject);

    if (!parsed.success) {
      return {
        errors: Object.fromEntries(
          Object.entries(parsed.error.flatten().fieldErrors).map(
            ([key, value]) => [key, value || []]
          )
        ),
        success: parsed.success,
      };
    }

    return {
      data: parsed.data! as T,
      success: parsed.success,
    };
  };
};

export { zValidator };
