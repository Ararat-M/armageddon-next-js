import { getTitle } from "./getTitle";

describe("getTitle", () => {
  test("should return valid format title", () => {
    expect(getTitle("Главная")).toBe("Главная | Armageddon 2023");
  });

  test("where null | undefined in argument", () => {
    expect(getTitle("")).toBe("Armageddon 2023");
  });

  test("where spaces string", () => {
    expect(getTitle("       ")).toBe("Armageddon 2023");
  });
});