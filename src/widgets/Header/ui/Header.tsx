import { useRef } from "react";
import classes from "./header.module.scss";
import { useObserver } from "@/shared/hooks/useObserver";
import Image from "next/image";

export function Header() {
  const observerTarget = useRef(null);
  const earthImage = useRef<HTMLImageElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);

  function observerCallback (entries: IntersectionObserverEntry[]) {
    if (earthImage.current == null || basketRef.current == null) return;

    if (!entries[0].isIntersecting) {
      earthImage.current.style.top = "83px";
    }

    if (entries[0].isIntersecting) {
      earthImage.current.style.top = "138px";
    }
  }

  useObserver(observerCallback, observerTarget);

  return (
    <>
      <div className={classes["text-area"]}>
        <h1 ref={observerTarget} className={classes.title}>
          ARMAGEDDON 2023
        </h1>
        <p>
          ООО “Команда им. Б. Уиллиса”.<br />Взрываем астероиды с 1998 года.
        </p>
      </div>
      <Image
        ref={earthImage}
        className={classes["my-img"]}
        priority
        src="/planeta_zemlia_2560x1600.jpg"
        width={377}
        height={436}
        alt="earth"
      />
    </>
  );
}