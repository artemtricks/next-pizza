import { Container, Title } from "@/components/shared";
import React from "react";
import { prisma } from "../../../../../prisma/prisma-client";
import { notFound } from "next/navigation";
import { PizzaImage } from "@/components/shared/pizza-image";
import { GroupVariants } from "@/components/shared/group-variants";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage size={40} imageUrl={product.imageUrl} />
        <div className="w-[490px] p-7 bg-[#f6f7f5]">
          <Title
            className="font-extrabold mb-1"
            text={product.name}
            size="md"
          />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
          </p>
          <GroupVariants
            value="1"
            items={[
              { name: "Маленькая", value: "1" },
              { name: "Средняя", value: "2" },
              { name: "Большая", value: "3", disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
