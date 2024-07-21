import React from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";
import { useSet } from "react-use";

type ReturnProps = {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
};

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[] | []>([]);
  const [loading, setIsLoading] = React.useState<boolean>(true);
  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

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

  return { ingredients, loading, selectedIds, onAddId: toggle };
};
