import { type AsteroidSchema, asteroidService } from "@/entities/Asteroid";
import { AsteroidList } from "@/widgets/AsteroidList";
import Image from "next/image";
import { useRef, useEffect } from "react";

interface IndexProps {
  asteroids: AsteroidSchema[];
}

export default function Index({ asteroids }: IndexProps) {
  const observerTarget = useRef(null);
  const earthImage = useRef(null);
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    function callback (entries: IntersectionObserverEntry[], observer) {
      if (!entries[0].isIntersecting) {
        earthImage.current.style.top = "83px";
      }

      if (entries[0].isIntersecting) {
        earthImage.current.style.top = "138px";
      }

      console.log("observer");
    }

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(observerTarget.current);
  }, []);

  return (
    <div className="app">
      <div ref={observerTarget} style={{ height: "123px" }}>
        <h1>
          ARMAGEDDON 2023
        </h1>
        <p>
          ООО “Команда им. Б. Уиллиса”.<br />Взрываем астероиды с 1998 года.
        </p>
      </div>
      <Image
        ref={earthImage}
        className="my-img"
        priority
        src="/planeta_zemlia_2560x1600.jpg"
        width={377}
        height={436}
        alt="earth"
      />
      <div className="asteroid-list">
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