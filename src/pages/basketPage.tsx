import { BasketContext } from "@/context";
import { AsteroidItem } from "@/widgets/AsteroidItem";
import { useContext } from "react";
import classes from "@/styles/basketPage.module.scss";
import { MainContainer } from "@/widgets/MainContainer";
import { Meta } from "@/meta";

export default function BasketPage() {
  const { basket } = useContext(BasketContext);

  return (
    <Meta title="Корзина">
      <div className={classes.basket}>
        <MainContainer>
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
          <span className={classes.footer}>© Все права и планета защищены</span>
        </MainContainer>
      </div>
    </Meta>
  );
}