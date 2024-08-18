import { Title, Container, TopBar, Filters } from "@/shared/components/shared";
import { ProductCardList } from "@/shared/components/shared/product-card-list";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

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
            <Suspense>
              <Filters />
            </Suspense>
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
