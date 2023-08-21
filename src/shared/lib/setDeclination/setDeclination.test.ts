import { setDeclination } from "./setDeclination";

describe("setDeclination", () => {
  test("should return valid declination for asteroid", () => {
    expect(setDeclination(1, ["астероид", "астероида", "астероидов"])).toBe("1 астероид");
    expect(setDeclination(4, ["астероид", "астероида", "астероидов"])).toBe("4 астероида");
    expect(setDeclination(126, ["астероид", "астероида", "астероидов"])).toBe("126 астероидов");
  });

  test("should return valid declination for lunar orbit", () => {
    expect(setDeclination(1, ["лунная орбита", "лунные орбиты", "лунных орбит"])).toBe("1 лунная орбита");
    expect(setDeclination(4, ["лунная орбита", "лунные орбиты", "лунных орбит"])).toBe("4 лунные орбиты");
    expect(setDeclination(126, ["лунная орбита", "лунные орбиты", "лунных орбит"])).toBe("126 лунных орбит");
  });
});