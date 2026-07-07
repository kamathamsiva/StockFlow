import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    organizationName: "",
    organizationId: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data.user);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading profile...</p>;
  }

  return (
    <div
      className="d-flex justify-content-center"
      style={{ paddingTop: "60px", paddingBottom: "40px" }}
    >
      <div style={{ width: "100%", maxWidth: "550px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1 text-primary">Profile</h2>

          <p className="text-muted mb-0">
            View your account information
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                value={user.email}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Organization Name
              </label>

              <input
                type="text"
                className="form-control"
                value={user.organizationName}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Organization ID
              </label>

              <input
                type="text"
                className="form-control"
                value={user.organizationId}
                readOnly
              />
            </div>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;