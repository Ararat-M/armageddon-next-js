import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import classes from "./basket.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface BasketProps {
  count: number;
}

export function Basket({ count }: BasketProps) {
  if (count <= 0) return false;

  return (
    <div className={classes.basket}>
      <span>
        Корзина<br />
        {count} {count === 1 ? "астероид" : "астероидов"}
      </span>
      <Button
        theme={ButtonTheme.PRIMARY}
        className={classNames(classes.btn)}
      >
        Отправить
      </Button>
    </div>
  );
}