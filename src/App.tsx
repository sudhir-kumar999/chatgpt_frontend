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
import MainPage from "./components/MainPage";
import VisionAPI from "./components/VisionAPI";
import EmailGenerator from "./components/EmailGenerator";
import EmailHistory from "./components/EmailHistory";
import EmailDetails from "./components/EmailDetails";
import Summarizer from "./components/Summarizer";

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
                <Route path="/user/dashboard" element={<ProtectedRoute><MainPage /></ProtectedRoute>}/>
                <Route path="/vision" element={<ProtectedRoute><VisionAPI/></ProtectedRoute>}/>
                <Route path="/email" element={<ProtectedRoute><EmailGenerator/></ProtectedRoute>}/>
                <Route path="/history" element={<ProtectedRoute><EmailHistory/></ProtectedRoute>}/>
                <Route path="/history/:id" element={<ProtectedRoute><EmailDetails/></ProtectedRoute>}/>
                <Route path="/summarizer" element={<ProtectedRoute><Summarizer/></ProtectedRoute>} />
                
                <Route path="/chatgpt"
                    element={
                        <ProtectedRoute >
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="user/dashboard" element={<UserDashboard/>} />
                    <Route path="chat/:sessionId" element={<ChatPage/>} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
