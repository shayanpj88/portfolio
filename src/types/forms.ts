export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormStatus = "idle" | "submitting" | "success" | "error";
