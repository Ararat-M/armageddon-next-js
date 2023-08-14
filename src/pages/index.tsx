import { type AsteroidSchema, asteroidService } from "@/entities/Asteroid";
import { AsteroidList } from "@/widgets/AsteroidList";
import Image from "next/image";
import { useRef } from "react";
import classes from "@/styles/index.module.scss";
import { HeaderTitle } from "@/widgets/headerTitle";

interface IndexProps {
  asteroids: AsteroidSchema[];
}

export default function Index({ asteroids }: IndexProps) {
  const earthImage = useRef(null);

  function observerCallback (entries: IntersectionObserverEntry[]) {
    if (!entries[0].isIntersecting) {
      earthImage.current.style.top = "83px";
    }

    if (entries[0].isIntersecting) {
      earthImage.current.style.top = "138px";
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
      <div style={{ position: "fixed", top: "134px", right: "-111px" }}>
        corzina
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