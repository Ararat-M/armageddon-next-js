import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./loader.module.scss";

export function Loader() {
  return (
    <div className={classNames(classes.loader)}>
      <div className={classNames(classes["lds-roller"])}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}