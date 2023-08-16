import { type AsteroidSchema, asteroidService } from "@/entities/Asteroid";
import { AsteroidList } from "@/widgets/AsteroidList";
import { useRef } from "react";
import classes from "@/styles/index.module.scss";
import { Basket } from "@/widgets/Basket";
import { MainContainer } from "@/widgets/MainContainer/ui/MainContainer";

interface IndexProps {
  asteroids: AsteroidSchema[];
}

export default function Index({ asteroids }: IndexProps) {
  const basketRef = useRef<HTMLDivElement>(null);

  function inVisibility() {
    if (basketRef.current == null) return;
    basketRef.current.style.top = "83px";
  }

  function notInVisibility() {
    if (basketRef.current == null) return;
    basketRef.current.style.top = "138px";
  }

  return (
    <div className={classes.app}>
      <MainContainer
        inVisibility={inVisibility}
        notInVisibility={notInVisibility}
      >
        <div className={classes["asteroid-list"]}>
          <AsteroidList asteroids={asteroids}></AsteroidList>
        </div>
        <div ref={basketRef} className={classes.basket}>
          <Basket />
        </div>
      </MainContainer>
    </div>
  );
}

export async function getServerSideProps() {
  const date = new Date();

  const asteroids = await asteroidService.getByDate(date);

  return {
    props: {
      asteroids
    }
  };
}