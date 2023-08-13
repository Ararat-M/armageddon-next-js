import { useEffect, useState } from "react";
import { type AsteroidSchema, asteroidService } from "@/entities/Asteroid";
import { AsteroidList } from "@/widgets/AsteroidList";
import { formatDateForApi } from "@/shared/lib/formatDateForApi/formatDateForApi";

interface IndexProps {
  asteroids: AsteroidSchema[];
}

export default function Index({ asteroids }: IndexProps) {
  return (
    <div className="app">
      <AsteroidList asteroids={asteroids}></AsteroidList>
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