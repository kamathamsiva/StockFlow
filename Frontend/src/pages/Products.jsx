import { useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      name: "Wireless Mouse",
      sku: "WM-001",
      quantity: 3,
      threshold: 5,
      sellingPrice: 799,
    },
    {
      id: 2,
      name: "USB Keyboard",
      sku: "KB-002",
      quantity: 20,
      threshold: 5,
      sellingPrice: 1299,
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmed) {
      console.log("Delete product:", name);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Products</h2>
          <p className="text-muted mb-0">
            Manage your inventory products
          </p>
        </div>

        <Link to="/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Search by product name or SKU"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Selling Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => {
                  const isLowStock =
                    product.quantity <= product.threshold;

                  return (
                    <tr key={product.id}>
                      <td className="fw-semibold">
                        {product.name}
                      </td>

                      <td>{product.sku}</td>
                      <td>{product.quantity}</td>

                      <td>
                        <span
                          className={`badge ${
                            isLowStock
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                        >
                          {isLowStock ? "Low Stock" : "In Stock"}
                        </span>
                      </td>

                      <td>₹{product.sellingPrice}</td>

                      <td>
                        <Link
                          to={`/products/edit/${product.id}`}
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(product.name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-muted my-4">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;