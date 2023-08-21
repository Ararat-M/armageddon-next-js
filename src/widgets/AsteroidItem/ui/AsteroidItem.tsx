import type { AsteroidSchema } from "@/entities/Asteroid";
import classes from "./asteroidItem.module.scss";
import Image from "next/image";
import { formatName } from "@/shared/lib/formatName/formatName";
import { formatDateForUi } from "@/shared/lib/formatDateForUi/formatDateForUi";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { formatNumber } from "@/shared/lib/formatNumber/formatNumber";
import { useContext } from "react";
import { BasketContext } from "@/context";
import Link from "next/link";
import { setDeclination } from "@/shared/lib/setDeclination/setDeclination";

interface AsteroidProps {
  asteroid: AsteroidSchema;
  isDistanceInKm: boolean;
  btnDisabled?: boolean;
}

export function AsteroidItem({ asteroid, isDistanceInKm, btnDisabled = false }: AsteroidProps) {
  const formatData = {
    id: asteroid.id,
    name: formatName(asteroid.name),
    date: formatDateForUi(asteroid.close_approach_data[0].close_approach_date),
    diameter: Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max),
    distance: {
      lunar: Number(formatNumber(asteroid.close_approach_data[0].miss_distance.lunar)),
      kilometers: formatNumber(asteroid.close_approach_data[0].miss_distance.kilometers)
    },
    isDangerous: asteroid.is_potentially_hazardous_asteroid
  };

  const { basket, setBasket } = useContext(BasketContext);

  function btnHandler() {
    if (basket.some((item) => item.id === asteroid.id)) {
      setBasket(() => basket.filter((item) => item.id !== asteroid.id));
    } else {
      setBasket(() => [...basket, asteroid]);
    }
  }

  return (
    <div className={classes.content}>
      <h3 className={classes.date}>{formatData.date}</h3>
      <div>
        <div className={classes.info}>
          <div>
            {isDistanceInKm
              ? <span>{formatData.distance.kilometers} км</span>
              : <span>{setDeclination(formatData.distance.lunar, ["лунная орбита", "лунные орбиты", "лунных орбит"])}</span>
            }
            <div>
              <Image
                src="/arrow.svg"
                alt="arrow"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div>
            {formatData.diameter < 200 ? (
              <Image
                src="/asteroid.png"
                width={22}
                height={24}
                alt="small asteroid"
              />
            ) : (
              <Image
                src="/asteroid.png"
                width={36}
                height={40}
                alt="big asteroid"
              />
            )}
          </div>
          <div>
            <Link className={classes.link} href={`/asteroid/${asteroid.id}`}>
              {formatData.name}
            </Link>
            <div>
              Ø {formatData.diameter}
            </div>
          </div>
        </div>
        <div className={classes["btns-area"]}>
          <Button
            theme={ButtonTheme.SMOOTH}
            className={classes.btn}
            onClick={btnHandler}
            disabled={btnDisabled}
          >
            {basket.some((item) => item.id === asteroid.id) ? "В корзине" : "Заказать"}
          </Button>
          {formatData.isDangerous &&
            <span className={classes.label}>
              <span className={classes["colorful-symbol"]}>&#x26A0;&#xFE0F;</span>
              Опасен
            </span>
          }
        </div>
      </div>
    </div>
  );
}