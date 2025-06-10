import ProductCard from "../../components/User/ProductCard";
import "./UserPage.css";

export interface ProductModel {
  id: string;
  title: string;
  price: string;
  quantity: string;
  coverImage: string;
}
const products: ProductModel[] = [
  {
    id: "1",
    title: "Elden Ring",
    price: "59.99",
    quantity: "12",
    coverImage:
      "https://image.api.playstation.com/vulcan/img/rnd/202111/0506/hcFeWRVGHYK72uOw6Mn6f4Ms.jpg",
  },
  {
    id: "2",
    title: "God of War Ragnarök",
    price: "69.99",
    quantity: "8",
    coverImage:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1738256985",
  },
  {
    id: "3",
    title: "Hogwarts Legacy",
    price: "59.99",
    quantity: "10",
    coverImage:
      "https://www.nintendo.com/eu/media/images/assets/nintendo_switch_2_games/hogwartslegacy/2x1_NSwitch2_HogwartsLegacy.jpg",
  },
];

function UserPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "10px",
      }}
    >
      {products.map((product) => (
        <ProductCard
          id={product.id}
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          coverImage={product.coverImage}
        />
      ))}
    </div>
  );
}

export default UserPage;
