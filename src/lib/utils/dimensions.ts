export const widthOptions = ["12'", "14'", "16'", "18'", "20'", "22'+", "Not sure"];
export const depthOptions = ["16'", "18'", "20'", "22'", "25'", "30'+", "Not sure"];
export const heightOptions = ["8'", "8.5'", "9'", "9.5'", "10'", "11'+", "Not sure"];

/** Parses a dimension string like "16'" or "22'+" into a number. Returns defaultValue for "Not sure" or empty. */
export function parseDimension(value: string, defaultValue: number): number {
  if (!value || value === "Not sure") return defaultValue;
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? defaultValue : num;
}

/** Converts feet to 3D scene units (÷2, preserving existing proportions). */
export function toSceneUnits(feet: number): number {
  return feet / 2;
}
