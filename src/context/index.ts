import type { AsteroidSchema } from "@/entities/Asteroid";
import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface IBasket {
  basket: AsteroidSchema[];
  setBasket: Dispatch<SetStateAction<AsteroidSchema[]>>;
}

export const BasketContext = createContext<IBasket>(null);