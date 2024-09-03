import React from "react";
import { WhiteBlock } from "../white-block";
import { Input } from "../../ui";
import { FormInput } from "../form";

type Props = {
  className?: string;
};

export const CheckoutPersonalForm = (props: Props) => {
  const { className } = props;
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" placeholder="Имя" className="text-base" />
        <FormInput
          name="lastName"
          placeholder="Фамилия"
          className="text-base"
        />
        <FormInput name="email" placeholder="Емаил" className="text-base" />
        <FormInput name="phone" placeholder="Телефон" className="text-base" />
      </div>
    </WhiteBlock>
  );
};
