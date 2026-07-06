import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "Wireless Mouse",
    sku: "WM-001",
    description: "Wireless Bluetooth mouse",
    quantity: 3,
    costPrice: 500,
    sellingPrice: 799,
    lowStockThreshold: 5,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product ID:", id);
    console.log("Updated product:", formData);

    alert("Product updated successfully");
    navigate("/products");
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Edit Product</h2>
        <p className="text-muted mb-0">
          Update product information
        </p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">SKU</label>
                <input
                  type="text"
                  name="sku"
                  className="form-control"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Quantity on Hand
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  min="0"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  name="lowStockThreshold"
                  className="form-control"
                  min="0"
                  value={formData.lowStockThreshold}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Cost Price</label>
                <input
                  type="number"
                  name="costPrice"
                  className="form-control"
                  min="0"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Selling Price</label>
                <input
                  type="number"
                  name="sellingPrice"
                  className="form-control"
                  min="0"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/products")}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;