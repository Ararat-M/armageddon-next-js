import { classNames } from "../classNames/classNames";

describe("classNames", () => {
  test("with only first param", () => {
    expect(classNames("some-class")).toBe("some-class");
  });

  test("with additional class", () => {
    expect(classNames("some-class", ["mb-l"])).toBe("some-class mb-l");
  });

  test("with mods", () => {
    expect(classNames("some-class", [], { hovered: true })).toBe("some-class hovered");
  });

  test("with all params", () => {
    expect(classNames("some-class", ["mb-l"], { hovered: true })).toBe("some-class mb-l hovered");
  });
});