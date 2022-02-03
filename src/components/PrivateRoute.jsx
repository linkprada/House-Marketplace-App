import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <div>Loading...</div>;
    }

    if (loggedIn) {
        return <Outlet></Outlet>;
    }

    return <Navigate to="/sign-in"></Navigate>;
};
