import { type AsteroidSchema, asteroidService } from "@/entities/Asteroid";
import { AsteroidList } from "@/widgets/AsteroidList";
import { useRef } from "react";
import classes from "@/styles/index.module.scss";
import { Basket } from "@/widgets/Basket";
import { MainContainer } from "@/widgets/MainContainer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Meta } from "@/meta";

interface IndexProps {
  asteroids: AsteroidSchema[];
}

export default function Index({ asteroids }: IndexProps) {
  const basketRef = useRef<HTMLDivElement>(null);
  const mobile = useMediaQuery("(min-width:706px)");

  function titleInVisibility() {
    if (basketRef.current == null) return;

    mobile
      ? basketRef.current.style.top = "83px"
      : basketRef.current.style.top = "auto";
  }

  function titleNotInVisibility() {
    if (basketRef.current == null) return;

    mobile
      ? basketRef.current.style.top = "132px"
      : basketRef.current.style.top = "auto";
  }

  return (
    <Meta title="Главная" description="Destroy Asteroids!">
      <div className={classes.app}>
        <MainContainer
          titleInVisibility={titleInVisibility}
          titleNotInVisibility={titleNotInVisibility}
        >
          <div className={classes["asteroid-list"]}>
            <AsteroidList asteroids={asteroids}></AsteroidList>
          </div>
          <div ref={basketRef} className={classes.basket}>
            <Basket />
          </div>
        </MainContainer>
      </div>
    </Meta>
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