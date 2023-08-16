import { useObserver } from "@/shared/hooks/useObserver";
import { type MutableRefObject, useRef } from "react";
import classes from "./mainContainer.module.scss";
import Image from "next/image";

interface MainContainerProps {
  children: React.ReactNode;
  defaultObserver?: boolean;
  inVisibility?: (...args: Array<MutableRefObject<any>>) => void;
  notInVisibility?: (...args: Array<MutableRefObject<any>>) => void;
}

export function MainContainer({
  children,
  defaultObserver = true,
  notInVisibility = () => {},
  inVisibility = () => {}
}: MainContainerProps) {
  const observerTarget = useRef(null);
  const earthImage = useRef<HTMLImageElement>(null);

  function inVisibilityDefault() {
    inVisibility();

    if (!defaultObserver || earthImage.current == null) return;

    earthImage.current.style.top = "83px";
  }

  function notInVisibilityDefault() {
    notInVisibility();

    if (!defaultObserver || earthImage.current == null) return;

    earthImage.current.style.top = "138px";
  }

  useObserver((entries: IntersectionObserverEntry[]) => {
    if (!entries[0].isIntersecting) {
      inVisibilityDefault();
    }

    if (entries[0].isIntersecting) {
      notInVisibilityDefault();
    }
  }, observerTarget);

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
        className={classes.img}
        priority
        src="/planeta_zemlia_2560x1600.jpg"
        width={377}
        height={436}
        alt="earth"
      />
      <>
        {children}
      </>
    </>

  );
}