import { type AsteroidSchema, asteroidService } from "@/entities/Asteroid";
import { AsteroidList } from "@/widgets/AsteroidList";
import Image from "next/image";
import { useRef } from "react";
import classes from "@/styles/index.module.scss";
import { HeaderTitle } from "@/widgets/HeaderTitle";
import { Basket } from "@/widgets/Basket";

interface IndexProps {
  asteroids: AsteroidSchema[];
}

export default function Index({ asteroids }: IndexProps) {
  const earthImage = useRef<HTMLImageElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);

  function observerCallback (entries: IntersectionObserverEntry[]) {
    if (!entries[0].isIntersecting) {
      earthImage.current.style.top = "83px";
      basketRef.current.style.top = "76px";
    }

    if (entries[0].isIntersecting) {
      earthImage.current.style.top = "138px";
      basketRef.current.style.top = "138px";
    }
  }

  return (
    <div className={classes.app}>
      <HeaderTitle observerCallback={observerCallback} />
      <Image
        ref={earthImage}
        className={classes["my-img"]}
        priority
        src="/planeta_zemlia_2560x1600.jpg"
        width={377}
        height={436}
        alt="earth"
      />
      <div className={classes["asteroid-list"]}>
        <AsteroidList asteroids={asteroids}></AsteroidList>
      </div>
      <div ref={basketRef} className={classes.basket}>
        <Basket count={1} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const date = new Date();

  const asteroids = await asteroidService.getByDate(date);

  return {
    props: {
      asteroids
    }
  };
}