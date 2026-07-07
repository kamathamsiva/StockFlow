import { useEffect, useState } from "react";
import api from "../services/api";

function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    defaultLowStockThreshold: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("/settings");

        setFormData({
          name: response.data.organization.name || "",
          defaultLowStockThreshold:
            response.data.organization.defaultLowStockThreshold ?? "",
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load settings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await api.put("/settings", {
        name: formData.name,
        defaultLowStockThreshold: Number(
          formData.defaultLowStockThreshold
        ),
      });

      setFormData({
        name: response.data.organization.name,
        defaultLowStockThreshold:
          response.data.organization.defaultLowStockThreshold,
      });

      setSuccess("Settings saved successfully");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save settings"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Settings</h2>
        <p className="text-muted mb-0">
          Manage your organization and inventory preferences
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Organization Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                style={{ maxWidth: "500px" }}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Default Low Stock Threshold
              </label>

              <input
                type="number"
                name="defaultLowStockThreshold"
                className="form-control"
                style={{ maxWidth: "300px" }}
                min="0"
                value={formData.defaultLowStockThreshold}
                onChange={handleChange}
                required
              />

              <div className="form-text">
                Products without their own threshold will use this value.
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;