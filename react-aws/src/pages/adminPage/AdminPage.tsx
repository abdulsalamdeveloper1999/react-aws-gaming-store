import React, { useState } from "react";
import "./AdminPage.css";
import { Box, Upload, Plus, Minus } from "lucide-react";
import UploadComponent from "../../components/Admin/UploadComponent";
import type { ProductEntity } from "../../models/ProductEntity";

interface FormData extends ProductEntity {
  image: File | null;
}

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    image: null,
  });
  const [resetUpload, setResetUpload] = useState(false);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      quantity: 0,
      image: null,
    });
  };

  const updateQuantity = (change: number) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(0, prev.quantity + change),
    }));
  };

  const handleInputChange = (
    field: keyof Omit<FormData, "image">,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select an image");
      return;
    }

    const form = new FormData();
    const product: ProductEntity = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      quantity: formData.quantity,
    };

    form.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    form.append("image", formData.image);

    try {
      const res = await fetch(
        "http://localhost:8080/api/product/create-product",
        {
          method: "POST",
          body: form,
        }
      );

      if (res.ok) {
        alert("Product uploaded successfully");
        resetForm();
        setResetUpload(true);
        setTimeout(() => setResetUpload(false), 100);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product");
    }
  };

  return (
    <div className="admin-page">
      <div className="header">
        <div className="header-content">
          <div className="header-title">
            <Box size={24} />
            <h1>Upload New Product</h1>
          </div>
          <p className="header-subtitle">Add your product details and images</p>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div className="section-title">
            <Upload size={20} />
            <h3>Product Images</h3>
          </div>

          <UploadComponent
            resetSignal={resetUpload}
            onFileSelect={(file) =>
              setFormData((prev) => ({ ...prev, image: file }))
            }
          />

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="title">Product Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter product title..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Enter product description..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", Number(e.target.value))
                  }
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <div className="quantity-control">
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => updateQuantity(-1)}
                    disabled={formData.quantity <= 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-value">{formData.quantity}</span>
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => updateQuantity(1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Upload Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
