import React from "react";
import { WhiteBlock } from "../white-block";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

type Props = {
  className?: string;
};
export const CheckoutAddressForm = (props: Props) => {
  const { className } = props;
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Input
          name="address"
          placeholder="Введите адресс..."
          className="text-base"
        />
        <Textarea
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
