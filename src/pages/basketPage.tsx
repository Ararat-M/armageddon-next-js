import { BasketContext } from "@/context";
import { AsteroidItem } from "@/widgets/AsteroidItem";
import { HeaderTitle } from "@/widgets/HeaderTitle";
import { useContext } from "react";
import classes from "@/styles/basketPage.module.scss";
import Image from "next/image";

export default function BasketPage() {
  const { basket } = useContext(BasketContext);

  return (
    <div className={classes.basket}>
      <HeaderTitle/>
      <Image
        className={classes.img}
        priority
        src="/planeta_zemlia_2560x1600.jpg"
        width={377}
        height={436}
        alt="earth"
      />
      <div className={classes.content}>
        <h2 className={classes.title}>
          Заказ отправлен!
        </h2>
        <ul className={classes["asteroid-list"]}>
          {basket.map((asteroid) =>
            <AsteroidItem btnDisabled={true} isDistanceInKm={true} key={asteroid.id} asteroid={asteroid}/>
          )}
        </ul>
      </div>
    </div>
  );
}