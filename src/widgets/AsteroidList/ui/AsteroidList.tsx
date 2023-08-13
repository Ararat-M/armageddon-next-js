/* eslint-disable @typescript-eslint/no-misused-promises */
import { asteroidService, type AsteroidSchema } from "@/entities/Asteroid";
import { AsteroidItem } from "@/widgets/AsteroidItem";
import { useState, useEffect, useRef } from "react";
import classes from "./asteroidList.module.scss";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { useFetching } from "@/shared/hooks/useFetching";
import { Loader } from "@/shared/ui/Loader/Loader";

interface AsteroidListProps {
  asteroids: AsteroidSchema[];
}

export function AsteroidList({ asteroids }: AsteroidListProps) {
  const [asteroidsArr, setAsteroidsArr] = useState<AsteroidSchema[]>(asteroids);
  const [sortedAsteroids, setSortedAsteroids] = useState<AsteroidSchema[]>([]);
  const [isDistanceInKm, setIsDistanceInKm] = useState(true);
  const [date, setDate] = useState(new Date());
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver>(null);

  const [isLoading, Error, fetchAsteroids] = useFetching(async () => {
    const newDate = new Date(+date + 86400 * 1000);
    const response = await asteroidService.getByDate(newDate);

    setAsteroidsArr([...asteroidsArr, ...response]);
    setDate(newDate);
  });

  useEffect(() => {
    setSortedAsteroids(asteroidsArr.sort(function (a, b) {
      const aDate = a.close_approach_data[0].epoch_date_close_approach;
      const bDate = b.close_approach_data[0].epoch_date_close_approach;

      if (aDate > bDate) {
        return 1;
      }

      if (aDate < bDate) {
        return -1;
      }

      return 0;
    }));
  }, [asteroidsArr]);

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    function callback (entries: IntersectionObserverEntry[], observer) {
      if (entries[0].isIntersecting) {
        fetchAsteroids();
        console.log(document.body.scrollHeight);
      }
    }

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(observerTarget.current);
  }, [date, fetchAsteroids]);

  return (
    <div className={classes.content}>
      <div className={classes.head}>
        <h1 className={classes.title}>
          Ближайшие подлёты<br /> астероидов
        </h1>
        <div>
          <Button
            theme={ButtonTheme.CLEAR}
            onClick={() => { setIsDistanceInKm(true); }}
            isActive={isDistanceInKm}
          >
            в километрах
          </Button>
          {" | "}
          <Button
            theme={ButtonTheme.CLEAR}
            onClick={() => { setIsDistanceInKm(false); }}
            isActive={!isDistanceInKm}
          >
            в лунных орбитах
          </Button>
        </div>
      </div>
      <ul className={classes.list}>
        {sortedAsteroids.map((asteroid: AsteroidSchema) => {
          return (<div
            key={asteroid.id}
          >
            <AsteroidItem asteroid={asteroid} isDistanceInKm={isDistanceInKm}/>
          </div>);
        })}
      </ul>
      {isLoading
        ? <div style={{ height: "80px" }}><Loader /></div>
        : <div style={{ height: "80px" }}></div>}
      <div ref={observerTarget}></div>
    </div>
  );
}