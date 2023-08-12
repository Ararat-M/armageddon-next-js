import { useEffect, useState } from "react";
import { type AsteroidSchema, asteroidService } from "@/entities/Asteroid";
import { AsteroidItem } from "@/widgets/AsteroidItem/";
import { AsteroidList } from "@/widgets/AsteroidList";

interface IndexProps {
  asteroids: AsteroidSchema[];
}

export default function Index({ asteroids }: IndexProps) {
  const [sortedAsteroids, setSortedAsteroids] = useState([]);

  useEffect(() => {
    setSortedAsteroids(asteroids.sort(function (a, b) {
      const aDate = a.close_approach_data[0].epoch_date_close_approach;
      const bDate = b.close_approach_data[0].epoch_date_close_approach;

      if (aDate > bDate) {
        return 1;
      }

      if (aDate < bDate) {
        return -1;
      }

      return 0;
    }));
  }, [asteroids]);

  return (
    <div className="app">
      <AsteroidList asteroids={sortedAsteroids}></AsteroidList>
    </div>
  );
}

export async function getServerSideProps() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const asteroids = await asteroidService.getByDate(formattedDate);

  return {
    props: {
      asteroids
    }
  };
}