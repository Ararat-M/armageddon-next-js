import type { AsteroidSchema } from "@/entities/Asteroid";

const API_KEY = process.env.API_KEY;
const API_URL = "https://api.nasa.gov/neo/rest/v1";

export const asteroidService = {
  async getByDate(date: string) {
    const response = await fetch(`${API_URL}/feed?start_date=${date}&end_date=${date}&api_key=${API_KEY}`);
    const data = await response.json();

    const asteroids: AsteroidSchema[] = [];

    data.near_earth_objects[date].forEach((item: AsteroidSchema) => {
      asteroids.push(item);
    });

    return asteroids;
  },

  async getById(id: string) {
    const response = await fetch(`${API_URL}/neo${id}&api_key=${API_KEY}`);
    const data: AsteroidSchema = await response.json();

    return data;
  }
};