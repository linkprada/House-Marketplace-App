import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const logged = false;

    if (logged) {
        return <Outlet></Outlet>;
    }

    return <Navigate to="/sign-in"></Navigate>;
};
