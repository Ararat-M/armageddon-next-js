type Mode = Record<string, boolean | string>;

export function classNames(cls: string, additional: string[] = [], mods: Mode = {}): string {
  return [
    cls,
    ...additional.map((cls) => cls),
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(" ");
}