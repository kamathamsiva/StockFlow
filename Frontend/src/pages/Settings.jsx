import { useState } from "react";

function Settings() {
  const [defaultThreshold, setDefaultThreshold] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Default threshold:", defaultThreshold);
    alert("Settings saved successfully");
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Settings</h2>
        <p className="text-muted mb-0">
          Manage your inventory preferences
        </p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Default Low Stock Threshold
              </label>

              <input
                type="number"
                className="form-control"
                style={{ maxWidth: "300px" }}
                min="0"
                value={defaultThreshold}
                onChange={(e) => setDefaultThreshold(e.target.value)}
                required
              />

              <div className="form-text">
                Products without their own threshold will use this value.
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;