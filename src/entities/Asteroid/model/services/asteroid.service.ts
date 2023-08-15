import type { AsteroidSchema } from "@/entities/Asteroid";
import { formatDateForApi } from "@/shared/lib/formatDateForApi/formatDateForApi";

const API_KEY = process.env.API_KEY;
const API_URL = "https://api.nasa.gov/neo/rest/v1";

export const asteroidService = {
  async getByDate(date: Date) {
    const formatDate = formatDateForApi(date);
    const response = await fetch(`${API_URL}/feed?start_date=${formatDate}&end_date=${formatDate}&api_key=${API_KEY}`);
    const data = await response.json();

    const asteroids: AsteroidSchema[] = [];

    data.near_earth_objects[formatDate].forEach((item: AsteroidSchema) => {
      asteroids.push(item);
    });

    return asteroids;
  },

  async getById(id: string) {
    const response = await fetch(`${API_URL}/neo/${id}?api_key=${API_KEY}`);
    const data: AsteroidSchema = await response.json();

    return data;
  }
};