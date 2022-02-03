import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

export const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <Spinner></Spinner>;
    }

    if (loggedIn) {
        return <Outlet></Outlet>;
    }

    return <Navigate to="/sign-in"></Navigate>;
};
