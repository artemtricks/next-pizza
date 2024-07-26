import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[] | []>([]);
  const [loading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const data = await Api.ingredients.getAll();
        setIngredients(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchIngredients();
  }, []);
  return { ingredients, loading };
};
