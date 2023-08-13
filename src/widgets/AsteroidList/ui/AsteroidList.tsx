import { type AsteroidSchema } from "@/entities/Asteroid";
import { AsteroidItem } from "@/widgets/AsteroidItem";
import { useState, useEffect } from "react";
import classes from "./asteroidList.module.scss";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";

interface AsteroidListProps {
  asteroids: AsteroidSchema[];
}

export function AsteroidList({ asteroids }: AsteroidListProps) {
  const [sortedAsteroids, setSortedAsteroids] = useState([]);
  const [isDistanceInKm, setIsDistanceInKm] = useState(true);

  useEffect(() => {
    setSortedAsteroids(asteroids.sort(function (a, b) {
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
  }, [asteroids]);

  return (
    <div className={classes.content}>
      <div className={classes.head}>
        <h1 className={classes.title}>
          Ближайшие подлёты астероидов
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
    </div>
  );
}