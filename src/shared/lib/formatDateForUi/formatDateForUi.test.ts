import { formatDateForUi } from "./formatDateForUi";

describe("formatDateForUi", () => {
  test("should return valid format name", () => {
    expect(formatDateForUi("2023-08-13")).toBe("13 авг 2023");
  });

  test("where empty string", () => {
    expect(formatDateForUi("")).toBe("");
  });

  test("where invalid string", () => {
    expect(formatDateForUi("Fdf453dfsdf")).toBe("Fdf453dfsdf");
    expect(formatDateForUi("       ")).toBe("");
  });
});