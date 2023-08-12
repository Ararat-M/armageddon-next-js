import { asteroidService, type AsteroidSchema } from "@/entities/Asteroid";
import { AsteroidItem } from "@/widgets/AsteroidItem";
import { useState, useEffect } from "react";
import classes from "./asteroidList.module.scss";

interface AsteroidListProps {
  asteroids: AsteroidSchema[];
}

export function AsteroidList({ asteroids }: AsteroidListProps) {
  const [sortedAsteroids, setSortedAsteroids] = useState([]);

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
    <>
      <h1>
        Ближайшие подлёты астероидов
      </h1>
      <div>
        <button>в километрах в лунных орбитах</button>
        <span>|</span>
        <button>в лунных орбитах</button>
      </div>
      <ul>
        {sortedAsteroids.map((asteroid: AsteroidSchema) => {
          return (<div
            key={asteroid.id}
          >
            <AsteroidItem asteroid={asteroid} />
          </div>);
        })}
      </ul>
    </>
  );
}