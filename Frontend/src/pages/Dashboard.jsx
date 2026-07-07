import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    lowStockCount: 0,
    lowStockProducts: [],
  });

  const [totalStock, setTotalStock] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashboardResponse, productsResponse] = await Promise.all([
          api.get("/dashboard"),
          api.get("/products"),
        ]);

        setDashboard(dashboardResponse.data);

        const stock = productsResponse.data.products.reduce(
          (total, product) => total + product.quantity,
          0
        );

        setTotalStock(stock);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-primary">Dashboard</h2>
        <p className="text-muted">
          Overview of your inventory
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">
                Total Products
              </p>

              <h2 className="fw-bold">
                {dashboard.totalProducts}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted">
                Total Stock Quantity
              </p>

              <h2 className="fw-bold mb-0">
                {totalStock}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            Low Stock Items ({dashboard.lowStockCount})
          </h5>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Low Stock Threshold</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.lowStockProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-muted py-4"
                    >
                      No low stock products
                    </td>
                  </tr>
                ) : (
                  dashboard.lowStockProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>

                      <td>
                        <span className="badge bg-danger">
                          {product.quantity}
                        </span>
                      </td>

                      <td>
                        {product.lowStockThreshold ?? "Default"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;