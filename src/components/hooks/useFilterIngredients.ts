import React from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";

type ReturnProps = {
  ingredients: Ingredient[];
};

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[] | []>([]);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const data = await Api.ingredients.getAll();
        setIngredients(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients };
};
