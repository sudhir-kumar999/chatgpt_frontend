import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
const PubNav = () => {
    const [open, setOpen] = useState(false);
    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Login", path: "/login" },
        { name: "Sign Up", path: "/signup" },
    ];

    return (
        <>
            <AppBar
                position="static"
                elevation={1}
                sx={{
                    bgcolor: "white",
                    color: "black",
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            fontWeight: "bold",
                        }}
                    >
            ChatGPT Clone
                    </Typography>
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            gap: 2,
                        }}
                    >
                        <Button component={Link} to="/" color="inherit">
              Home
                        </Button>
                        <Button component={Link} to="/login" color="inherit">
              Login
                        </Button>
                        <Button
                            component={Link}
                            to="/signup"
                            variant="contained"
                        >
              Sign Up
                        </Button>
                    </Box>
                    <IconButton
                        sx={{
                            display: {
                                xs: "block",
                                md: "none",
                            },
                        }}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={{ width: 250 }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                >
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default PubNav;