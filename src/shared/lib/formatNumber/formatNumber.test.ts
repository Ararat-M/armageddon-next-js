import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  test("should return valid format name", () => {
    expect(formatNumber(12652475)).toBe("12 652 475");
    expect(formatNumber(1265)).toBe("1 265");
    expect(formatNumber(126)).toBe("126");
  });

  test("where decimal in argument", () => {
    expect(formatNumber(12652475.1)).toBe("12 652 475");
    expect(formatNumber(12652475.50)).toBe("12 652 475");
    expect(formatNumber(12652475.99)).toBe("12 652 475");
  });
});