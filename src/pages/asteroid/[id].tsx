import classes from "@/styles/asteroid.module.scss";
import { asteroidService, type AsteroidSchema } from "@/entities/Asteroid";
import { formatDateForUi } from "@/shared/lib/formatDateForUi/formatDateForUi";
import { formatName } from "@/shared/lib/formatName/formatName";
import { formatNumber } from "@/shared/lib/formatNumber/formatNumber";
import Image from "next/image";
import { Meta } from "@/meta";

interface AsteroidProps {
  asteroid: AsteroidSchema;
}

enum AsteroidOrbit {
  Venus = "Венеры",
  Earth = "Земли",
  Mars = "Марса",
  Jupiter = "Юпитера",
  Saturn = "Сатурна",
  Uranus = "Урана",
  Neptune = "Нептуна"
}

export default function Asteroid({ asteroid }: AsteroidProps) {
  const formatData = {
    id: asteroid.id,
    name: formatName(asteroid.name),
    date: formatDateForUi(asteroid.close_approach_data[0].close_approach_date),
    absolute_magnitude: asteroid.absolute_magnitude_h,
    diameter: Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max),
    distance: {
      lunar: formatNumber(asteroid.close_approach_data[0].miss_distance.lunar),
      kilometers: formatNumber(asteroid.close_approach_data[0].miss_distance.kilometers)
    },
    isDangerous: asteroid.is_potentially_hazardous_asteroid,
    first_observation_date: formatDateForUi(asteroid.orbital_data.first_observation_date),
    perihelion_distance: asteroid.orbital_data.perihelion_distance,
    orbit_class_type: asteroid.orbital_data.orbit_class.orbit_class_type,
    close_approach_count: asteroid.close_approach_data.length,
    close_approach_arr: asteroid.close_approach_data
  };

  return (
    <Meta title={"Asteroid " + formatData.name}>
      <Image
        className={classes.img}
        priority
        src="/asteroid-icon.svg"
        width={375}
        height={375}
        alt="asteroid"
      />
      <div className={classes.info}>
        <h2 className={classes.name}>
          {formatData.name}
          {formatData.isDangerous && <span className={classes["colorful-symbol"]}>&#x26A0;&#xFE0F;</span>}
        </h2>
        <div>{formatData.first_observation_date} был исследован впервые</div>
        <div>{formatData.close_approach_count} сближений с землей</div>
        <div>{formatData.date} впервые был близок к земле</div>
        <div>Абсолютная звёздная величина: {formatData.absolute_magnitude}</div>
        <div>Диаметр: {formatData.diameter} м.</div>
        <div>тип класса орбиты: {formatData.orbit_class_type}</div>
      </div>
      <div className={classes["close-approach-list"]}>
        {formatData.close_approach_arr.map((approach) => {
          return (
            <div
              key={approach.close_approach_date}
              className={classes["close-approach-info"]}
            >
              <div className={classes["close-approach-date"]}>{formatDateForUi(approach.close_approach_date)}</div>
              <div>
                Относительная скорость {formatNumber(parseInt(approach.relative_velocity.kilometers_per_hour))} км/ч
              </div>
              <div>
                Расстояние до Земли {formatNumber(Math.round(approach.miss_distance.kilometers))} км
              </div>
              <div>
                Вращается по орбите {AsteroidOrbit[approach.orbiting_body]}
              </div>
            </div>
          );
        })}
      </div>
    </Meta>
  );
}

export async function getServerSideProps({ params }) {
  const asteroid = await asteroidService.getById(params.id);

  return {
    props: { asteroid }
  };
}