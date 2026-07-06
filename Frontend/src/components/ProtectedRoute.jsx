import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

const ProtectedRoute = () => {
    const token = true
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default ProtectedRoute