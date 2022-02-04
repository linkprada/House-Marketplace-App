import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./components/PrivateRoute";
import Category from "./pages/Category";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Explore></Explore>}></Route>
                    <Route path="/offers" element={<Offers></Offers>}></Route>
                    <Route path="/category/:categoryName" element={<Category></Category>}></Route>
                    <Route path="/profile" element={<PrivateRoute></PrivateRoute>}>
                        <Route path="/profile" element={<Profile></Profile>}></Route>
                    </Route>
                    <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
                    <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword></ForgotPassword>}
                    ></Route>
                </Routes>
                <Navbar></Navbar>
            </Router>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default App;
