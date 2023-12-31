import { asteroidService, type AsteroidSchema } from "@/entities/Asteroid";
import { AsteroidItem } from "@/widgets/AsteroidItem";
import { useState, useEffect, useRef } from "react";
import classes from "./asteroidList.module.scss";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { useFetching } from "@/shared/hooks/useFetching";
import { Loader } from "@/shared/ui/Loader/Loader";
import { useObserver } from "@/shared/hooks/useObserver";
import { ONE_DAY_IN_MS } from "@/shared/const";

interface AsteroidListProps {
  asteroids: AsteroidSchema[];
}

export function AsteroidList({ asteroids }: AsteroidListProps) {
  const [asteroidsArr, setAsteroidsArr] = useState<AsteroidSchema[]>(asteroids);
  const [sortedAsteroids, setSortedAsteroids] = useState<AsteroidSchema[]>([]);
  const [isDistanceInKm, setIsDistanceInKm] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const [isLoading, Error, fetchAsteroids] = useFetching(async () => {
    const newDate = new Date(+date + ONE_DAY_IN_MS);
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

  useObserver((entries) => {
    if (entries[0].isIntersecting) {
      void fetchAsteroids();
    }
  }, observerTarget, isLoading);

  return (
    <div className={classes.content}>
      <div className={classes.head}>
        <h2 className={classes.title}>
          Ближайшие подлёты<br />астероидов
        </h2>
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
          return (
            <li
              key={asteroid.id}
            >
              <AsteroidItem asteroid={asteroid} isDistanceInKm={isDistanceInKm}/>
            </li>
          );
        })}
      </ul>
      <div className={classes.loader} ref={observerTarget}>{isLoading && <Loader />}</div>
    </div>
  );
}