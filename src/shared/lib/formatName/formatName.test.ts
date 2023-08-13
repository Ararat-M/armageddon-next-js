import { formatName } from "./formatName";

describe("formatName", () => {
  test("should return valid format name", () => {
    expect(formatName("(2016 CA138)")).toBe("2016 CA138");
    expect(formatName(" 4 38 66 1 (2008 EP6)   ")).toBe("2008 EP6");
  });

  test("where empty string", () => {
    expect(formatName("")).toBe("");
  });

  test("where invalid string", () => {
    expect(formatName("Fdf453dfsdf")).toBe("Fdf453dfsdf");
    expect(formatName("       ")).toBe("");
  });
});