type Mode = Record<string, boolean | string>;

export function classNames(cls: string, additional: string[] = [], mods: Mode = {}): string {
  return [
    cls.trim(),
    ...additional.map((cls) => cls.trim()),
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className]) => className.trim())
  ].join(" ").trim();
}