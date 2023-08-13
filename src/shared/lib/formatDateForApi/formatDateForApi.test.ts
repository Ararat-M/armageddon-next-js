import { formatDateForApi } from "./formatDateForApi";

describe("formatDateForApi", () => {
  test("should return valid format name", () => {
    expect(formatDateForApi(new Date(1))).toBe("1970-01-01");
  });

  test("where invalid date", () => {
    expect(formatDateForApi(new Date("d"))).toBe("NaN-NaN-NaN");
  });
});