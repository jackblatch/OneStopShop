export const createSlug = (value: string) => {
  return value
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
};
