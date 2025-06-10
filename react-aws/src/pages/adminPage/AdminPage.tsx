import React, { useState } from "react";
import "./AdminPage.css";
import { Box, Upload, Plus, Minus } from "lucide-react";
import UploadComponent from "../../components/Admin/UploadComponent";

const AdminPage: React.FC = () => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="main">
      <div className="topContainer">
        <div
          style={{
            display: "flex",
            alignItems: "center", // Vertically align icon and text
            gap: "8px", // Optional: adds space between icon and text
          }}
        >
          <Box style={{ color: "white" }} />
          <h1 style={{ color: "white", margin: 0 }}>Upload New Product</h1>
        </div>
        <h4 style={{ margin: 0, color: "white" }}>
          Add your product details and images
        </h4>
      </div>
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Upload />
          <h3>Product Images</h3>
        </div>

        <UploadComponent />

        {/* Title input */}
        <form>
          <label>Title</label>
          <input type="text" placeholder="Enter game title..." />

          <label>Description</label>
          <input type="text" placeholder="Enter game description..." />

          <label>Price</label>
          <input type="text" placeholder="Enter game description..." />
        </form>

        {/* Quantity */}
        <div className="quantity">
          <div className="remove">
            <Minus
              size={14}
              onClick={() =>
                quantity !== 0 ? setQuantity(quantity - 1) : null
              }
            />
          </div>
          <p>{quantity}</p>
          <div className="add">
            <Plus size={14} onClick={() => setQuantity(quantity + 1)} />
          </div>
        </div>

        {/* divider    */}
        <div className="divider"></div>

        {/* uploadButtton */}
        <button className="uploadButton"> Upload Product</button>
      </div>
    </div>
  );
};

export default AdminPage;
