import Box from "@mui/material/Box";
import PubNav from "./PubNav";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const PubLayout = () => {
    const { user, loading } = useContext(AuthContext)!;

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (user) {
        return <Navigate to="/user/dashboard" replace />;
    }

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <PubNav />
            <Outlet />
        </Box>
    );
};

export default PubLayout;