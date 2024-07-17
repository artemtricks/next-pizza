import { Title, Container, TopBar, Filters } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductCardList } from "@/components/shared/product-card-list";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" className="font-extrabold" size="lg" />
      </Container>
      <TopBar />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[250px] ">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductCardList
                title="Пиццы"
                categoryId={1}
                items={[
                  {
                    name: "Чизбургер пицца",
                    id: 1,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 2,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 3,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 4,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 5,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 6,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 7,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                ]}
              />
              <ProductCardList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    name: "Чизбургер пицца",
                    id: 1,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 2,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 3,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 4,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 5,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 6,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                  {
                    name: "Чизбургер пицца",
                    id: 7,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EE7D61389AB51A8F648A0DBA5B1689.avif",
                    price: 550,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
