import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";

type Props = {
  name: string;
  imageUrl: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export const IngredientItem = (props: Props) => {
  const { name, imageUrl, price, onClick, active, className } = props;

  return (
    <div
      className={cn(
        "flex items-center flex-col text-center bg-white p-1 rounded-md w-32 cursor-pointer shadow-md relative",
        { "border border-primary": active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img width={110} height={110} src={imageUrl} alt={name} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} P</span>
    </div>
  );
};
