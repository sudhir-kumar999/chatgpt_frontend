import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PubLayout from "./components/PubLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import UserDashboard from "./components/UserDashboard";

function App() {
    return (
        <>
            <Routes> 
                <Route element={<PubLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route
                    element={
                        <ProtectedRoute >
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/user/dashboard" element={<UserDashboard/>} />
                    <Route path="/chat/:sessionId" element={<ChatPage/>} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
