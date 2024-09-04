"use client";

import { Container, Title } from "@/shared/components/shared";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from "@/shared/components/shared/checkout";
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { useCart } from "@/shared/hooks/useCart";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/constants/checkout-form-schema";
import toast from "react-hot-toast";
import { createOrder } from "@/app/actions";

export default function CheckoutPage() {
  const { totalAmount, items, loading, removeCartItem, updateItemQuantity } =
    useCart();
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success("Заказ успешно оформлен! Переход на оплату...");

      if (url!) {
        location.href = url;
      }
    } catch (err) {
      toast.error("Не удалось создать заказ");
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col flex-1 mb-20 gap-10">
              <CheckoutCart
                items={items}
                loading={loading}
                removeCartItem={removeCartItem}
                updateItemQuantity={updateItemQuantity}
              />
              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading}
                submitting={submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
