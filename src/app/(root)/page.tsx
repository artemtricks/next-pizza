import { Title, Container, TopBar, Filters } from "@/shared/components/shared";
import { ProductCard } from "@/shared/components/shared/product-card";
import { ProductCardList } from "@/shared/components/shared/product-card-list";
import { prisma } from "../../../prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" className="font-extrabold" size="lg" />
      </Container>
      <TopBar
        categories={categories.filter((item) => item.products.length > 0)}
      />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[250px] ">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (item) =>
                  item.products.length > 0 && (
                    <ProductCardList
                      key={item.id}
                      title={item.name}
                      categoryId={item.id}
                      items={item.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
