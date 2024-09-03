import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput, FormTextarea } from "../form";
import { AdressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

type Props = {
  className?: string;
};
export const CheckoutAddressForm = (props: Props) => {
  const { className } = props;
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => {
            return (
              <>
                <AdressInput onChange={field.onChange} />
                {fieldState.error?.message && (
                  <ErrorText text={fieldState.error.message} />
                )}
              </>
            );
          }}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
