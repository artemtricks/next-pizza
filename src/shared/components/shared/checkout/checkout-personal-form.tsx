import React from "react";
import { WhiteBlock } from "../white-block";
import { Input } from "../../ui";

type Props = {
  className?: string;
};

export const CheckoutPersonalForm = (props: Props) => {
  const { className } = props;
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <Input name="firstName" placeholder="Имя" className="text-base" />
        <Input name="lastName" placeholder="Фамилия" className="text-base" />
        <Input name="email" placeholder="Емаил" className="text-base" />
        <Input name="phone" placeholder="Телефон" className="text-base" />
      </div>
    </WhiteBlock>
  );
};
