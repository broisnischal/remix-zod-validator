import { useActionData } from "@remix-run/react";
import { ZodSchema } from "zod";

export default function useZodValidator(schema: ZodSchema) {
  const formData = useActionData();

  const validatedData = schema.safeParse(formData);

  return validatedData;
}
