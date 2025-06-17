import { Heart } from "lucide-react";

import "./ProductCard.css";
import type { ProductEntity } from "../../models/ProductEntity";

function ProductCard(props: ProductEntity) {
  return (
    <div className="productCard">
      <img className="coverImage" src={props.imageUrl}></img>
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
