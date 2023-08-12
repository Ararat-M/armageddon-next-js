import type { AsteroidSchema } from "@/entities/Asteroid";
import classes from "./asteroidItem.module.scss";

interface AsteroidProps {
  asteroid: AsteroidSchema;
}

export function AsteroidItem({ asteroid }: AsteroidProps) {
  return (
    <>
      <h3 className={classes.date}>{asteroid.close_approach_data[0].close_approach_date}</h3>
      <div>
        <div>{asteroid.close_approach_data[0].miss_distance.lunar}</div>
        <div>Icon</div>
        <div>
          <a href={asteroid.links.self}>
            {asteroid.name}
          </a>
          <span>
            {asteroid.estimated_diameter.meters.estimated_diameter_max}
          </span>
        </div>
        <div>
          <button>Заказать</button>
          <span>Опасен</span>
        </div>
      </div>
    </>
  );
}