import { useEffect, useState } from "react";
import { type AsteroidSchema, asteroidService } from "@/entities/Asteroid";
import { AsteroidList } from "@/widgets/AsteroidList";
import { formatDateForApi } from "@/shared/lib/formatDateForApi/formatDateForApi";

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
  const date = formatDateForApi(new Date());

  const asteroids = await asteroidService.getByDate(date);

  return {
    props: {
      asteroids
    }
  };
}