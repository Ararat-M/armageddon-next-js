import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
  PRIMARY = "primary"
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  theme?: ButtonTheme;
  isActive?: boolean;
  isSmooth?: boolean;
}

export function Button({
  children,
  theme = ButtonTheme.PRIMARY,
  className = "",
  isActive,
  isSmooth,
  ...props
}: ButtonProps) {
  const additionalCls = [
    className || ""
  ];

  const mods = {
    [classes.active]: isActive,
    [classes.smooth]: isSmooth
  };

  return (
    <button
      className={classNames(classes[theme], additionalCls, mods)}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}