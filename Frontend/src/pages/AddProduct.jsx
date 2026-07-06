import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    quantity: "",
    costPrice: "",
    sellingPrice: "",
    lowStockThreshold: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New product:", formData);
    alert("Product form submitted successfully");

    navigate("/products");
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Add Product</h2>
        <p className="text-muted mb-0">
          Add a new product to your inventory
        </p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter product name"
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
                  placeholder="Example: WM-001"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Enter product description"
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
                  placeholder="Example: 5"
                  value={formData.lowStockThreshold}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Cost Price
                </label>

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
                <label className="form-label">
                  Selling Price
                </label>

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

              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;