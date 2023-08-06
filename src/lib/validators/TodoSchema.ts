import { enumType, minLength, object, type Output, string } from "valibot"; // 0.76 kB

// Create login schema with email and password
export const todoSchema = object({
  title: string([minLength(1)]),
  status: enumType(["not-started", "on-going", "completed"]),
});

export type todoType = Output<typeof todoSchema>;
