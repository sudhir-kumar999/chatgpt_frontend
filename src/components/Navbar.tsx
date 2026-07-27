import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
    { label: "Home", path: "/app" },
    { label: "AI Assistance", path: "/chatgpt/user/dashboard" },
    { label: "Chat with Images", path: "/vision" },
    { label: "Email History", path: "/history" },
    { label: "AI Email Generator", path: "/email" },
    { label: "AI Summarizer", path: "/summarizer" },

];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const {logout}=useContext(AuthContext)!;

    return (
        <>
            <AppBar
                position="sticky"
                color="inherit"
                elevation={1}
                sx={{
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={() => setOpen(true)}
                        sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700,
                        }}
                    >
            AI Apps
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            gap: 2,
                        }}
                    >
                        {menuItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                color="inherit"
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setOpen(false);
                                logout();
                            }}
                        >
                Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{
                        width: 250,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ p: 2, fontWeight: "bold" }}
                    >
            AI Apps
                    </Typography>

                    <List sx={{ flexGrow: 1 }}>
                        {menuItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                >
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            startIcon={<LogoutIcon />}
                            onClick={() => {
                                setOpen(false);
                                logout();
                            }}
                        >
                Logout
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}