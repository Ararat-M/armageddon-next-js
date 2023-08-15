import { useRef } from "react";
import classes from "./headerTitle.module.scss";
import { useObserver } from "@/shared/hooks/useObserver";

interface HeaderTitleProps {
  observerCallback?: (entries: IntersectionObserverEntry[], observer: any) => void;
}

export function HeaderTitle({ observerCallback }: HeaderTitleProps) {
  const observerTarget = useRef(null);

  if (observerCallback) useObserver(observerCallback, observerTarget);

  return (
    <div className={classes["text-area"]}>
      <h1 ref={observerTarget} className={classes.title}>
        ARMAGEDDON 2023
      </h1>
      <p>
        ООО “Команда им. Б. Уиллиса”.<br />Взрываем астероиды с 1998 года.
      </p>
    </div>
  );
}