import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/products/${product.id}`);

      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.id !== product.id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  };

  if (loading) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1  text-primary">Products</h2>
          <p className="text-muted mb-0">
            Manage your inventory products
          </p>
        </div>

        <Link to="/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

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
                  const threshold =
                    product.lowStockThreshold ?? 8;

                  const isLowStock =
                    product.quantity <= threshold;

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
                          {isLowStock
                            ? "Low Stock"
                            : "In Stock"}
                        </span>
                      </td>

                      <td>
                        ₹{Number(product.sellingPrice || 0).toFixed(2)}
                      </td>

                      <td>
                        <Link
                          to={`/products/edit/${product.id}`}
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(product)}
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