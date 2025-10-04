export const normalizeBase = (base: string) => (base || "").replace(/\/+$/, "");

export const pad2 = (n: number) => String(n).padStart(2, "0");
