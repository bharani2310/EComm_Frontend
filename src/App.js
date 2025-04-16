import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home.js";
import Register from "./pages/register.js";
import IdentityVerification from "./pages/identityVerification.js";
import Login from "./pages/login.js";
import { useAuth } from "./utils/authContext.js"; // Import auth context
import NavBar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Admin from "./pages/admin.js";
import User from "./pages/user.js";
import ProductDetail from "./pages/ProductDetail.js";
import DetailsPage from "./components/detailsPage.js";

function PrivateRoute({ element }) {
    const { isAuthenticated,user } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/verifyEmail" element={<IdentityVerification />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/details/:id" element={<DetailsPage />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
