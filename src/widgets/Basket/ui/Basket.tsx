import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import classes from "./basket.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useContext } from "react";
import { BasketContext } from "@/context";
import Link from "next/link";
import { setDeclination } from "@/shared/lib/setDeclination/setDeclination";

export function Basket() {
  const { basket } = useContext(BasketContext);

  if (basket.length <= 0) return false;

  return (
    <div className={classes.basket}>
      <span>
        Корзина<br />
        {setDeclination(basket.length, ["астероид", "астероида", "астероидов"])}
      </span>
      <Link href={"/basketPage"}>
        <Button
          theme={ButtonTheme.PRIMARY}
          className={classNames(classes.btn)}
        >
          Отправить
        </Button>
      </Link>
    </div>
  );
}