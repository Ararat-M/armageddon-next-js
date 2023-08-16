import { useObserver } from "@/shared/hooks/useObserver";
import { useRef } from "react";
import classes from "./mainContainer.module.scss";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";

interface MainContainerProps {
  children: React.ReactNode;
  defaultObserver?: boolean;
  titleInVisibility?: () => void;
  titleNotInVisibility?: () => void;
}

export function MainContainer({
  children,
  defaultObserver = true,
  titleNotInVisibility = () => {},
  titleInVisibility = () => {}
}: MainContainerProps) {
  const observerTarget = useRef(null);
  const earthImage = useRef<HTMLImageElement>(null);
  const mobile = useMediaQuery("(min-width:706px)");

  function titleInVisibilityDefault() {
    titleInVisibility();

    if (!defaultObserver || earthImage.current == null) return;

    mobile
      ? earthImage.current.style.top = "83px"
      : earthImage.current.style.top = "115px";
  }

  function titleNotInVisibilityDefault() {
    titleNotInVisibility();

    if (!defaultObserver || earthImage.current == null) return;

    mobile
      ? earthImage.current.style.top = "138px"
      : earthImage.current.style.top = "123px";
  }

  useObserver((entries: IntersectionObserverEntry[]) => {
    if (!entries[0].isIntersecting) {
      titleInVisibilityDefault();
    }

    if (entries[0].isIntersecting) {
      titleNotInVisibilityDefault();
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