function Dashboard() {
  const totalProducts = 24;
  const totalStock = 156;

  const lowStockItems = [
    {
      id: 1,
      name: "Wireless Mouse",
      sku: "WM-001",
      quantity: 3,
      threshold: 5,
    },
    {
      id: 2,
      name: "USB Keyboard",
      sku: "KB-002",
      quantity: 2,
      threshold: 5,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Overview of your inventory
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">
                Total Products
              </p>

              <h2 className="fw-bold mb-0">
                {totalProducts}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">
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
            Low Stock Items
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
                {lowStockItems.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>

                    <td>
                      <span className="badge bg-danger">
                        {product.quantity}
                      </span>
                    </td>

                    <td>{product.threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;