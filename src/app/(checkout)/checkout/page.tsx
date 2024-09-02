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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema } from "@/shared/constants/checkout-form-schema";

export default function CheckoutPage() {
  const { totalAmount, items, loading, removeCartItem, updateItemQuantity } =
    useCart();

  const from = useForm({
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

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        <div className="flex flex-col flex-1 mb-20 gap-10">
          <CheckoutCart
            items={items}
            loading={loading}
            removeCartItem={removeCartItem}
            updateItemQuantity={updateItemQuantity}
          />
          <CheckoutPersonalForm />
          <CheckoutAddressForm />
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
        </div>
      </div>
    </Container>
  );
}
