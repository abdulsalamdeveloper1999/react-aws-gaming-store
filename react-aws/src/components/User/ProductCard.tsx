import { Heart } from "lucide-react";
import type { ProductModel } from "../../pages/UserPage/UserPage";
import "./ProductCard.css";

function ProductCard(props: ProductModel) {
  return (
    <div className="productCard">
      <img className="coverImage" src={props.coverImage}></img>
      <h4>{props.title}</h4>
      <h3>{props.price}</h3>
      <h3>{props.quantity}</h3>
      <div className="btnAndFav">
        <button className="buttomStyle">Add to Cart</button>
        <Heart />
      </div>
    </div>
  );
}

export default ProductCard;
