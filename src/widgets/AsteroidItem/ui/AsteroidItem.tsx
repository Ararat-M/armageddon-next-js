/* eslint-disable react/jsx-indent-props */
import type { AsteroidSchema } from "@/entities/Asteroid";
import classes from "./asteroidItem.module.scss";
import Image from "next/image";
import { formatName } from "@/shared/lib/formatName/formatName";
import { formatDateForUi } from "@/shared/lib/formatDateForUi/formatDateForUi";
import { Button } from "@/shared/ui/Button/Button";
import { formatNumber } from "@/shared/lib/formatNumber/formatNumber";

interface AsteroidProps {
  asteroid: AsteroidSchema;
  isDistanceInKm: boolean;
}

export function AsteroidItem({ asteroid, isDistanceInKm }: AsteroidProps) {
  const formatData = {
    name: formatName(asteroid.name),
    date: formatDateForUi(asteroid.close_approach_data[0].close_approach_date),
    diameter: Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max),
    distance: {
      lunar: formatNumber(asteroid.close_approach_data[0].miss_distance.lunar),
      kilometers: formatNumber(asteroid.close_approach_data[0].miss_distance.kilometers)
    },
    isDangerous: asteroid.is_potentially_hazardous_asteroid
  };

  return (
    <li className={classes.content}>
      <h3 className={classes.date}>{formatData.date}</h3>
      <div>
        <div className={classes.info}>
          <div>
            {isDistanceInKm
              ? <span>{formatData.distance.kilometers} км</span>
              : <span>{formatData.distance.lunar} лунных орбит</span>
            }
          </div>
          <div>
            {formatData.diameter < 200
              ? <Image
                src="/asteroid.png"
                width={22}
                height={24}
                alt="small asteroid"
              />
              : <Image
                src="/asteroid.png"
                width={36}
                height={40}
                alt="big asteroid"
              />
            }
          </div>
          <div>
            <div>
              {formatData.name}
            </div>
            <div>
              Ø {formatData.diameter}
            </div>
          </div>
        </div>
        <div className={classes["btns-area"]}>
          <Button >Заказать</Button>
          {formatData.isDangerous &&
            <span className={classes.label}>
              <span className={classes["colorful-symbol"]}>&#x26A0;&#xFE0F;</span>
              Опасен
            </span>
          }
        </div>
      </div>
    </li>
  );
}