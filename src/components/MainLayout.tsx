import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatSidebar from "./ChatSidebar";
import apiData from "../../api/apidata";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import axios from "axios";
    interface Session{
    id:string
    session_name:string
}
const drawerWidth = 280;

const MainLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const { user, logout } = useContext(AuthContext)!;
    const [session,setSession]=useState<Session[]>([]);
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllSession();
    }, []);

    async function getAllSession() {
        setLoading(true);
        try {
            const res = await apiData.get("/user/get/session");
            if (res.data.success) {
                setSession(res.data.data);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Login failed");
            } else {
                toast.error("Something went wrong");
            }
        }finally{
            setLoading(false);
        }
    }
    async function newSession() {
        setLoading(true);
        try {
            const res = await apiData.post("/user/session");
            if (res.data.success) {
                setSession(prev => [res.data.data, ...prev]);
                navigate(`/chatgpt/chat/${res.data.data.id}`);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Login failed");
            } else {
                toast.error("Something went wrong");
            }
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        const ok = window.confirm("Delete this chat?");
        if (!ok) return;
        const res = await apiData.delete(`/user/session/${id}`);

        if (res.data.success) {
            setSession(prev => prev.filter(s => s.id !== id));
            if (location.pathname === `/chatgpt/chat/${id}`) {
                navigate("/chatgpt/user/dashboard");
            }
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    const drawer = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                // bgcolor: "#202123",
                // color: "white",
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{fontWeight:"bold"}}>
          ChatGPT Clone
                </Typography>
            </Toolbar>

            <Divider />

            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    // sx={{
                    //     color: "white",
                    //     borderColor: "#555",
                    // }}
                    onClick={newSession}
                >
          New Chat
                </Button>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflow: "auto",
                }}
            >
                <ChatSidebar
                    session={session}
                    onDelete={handleDelete}
                />
            </Box>

            <Divider />

            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ mr: 1 }}>
                        {user?.name?.charAt(0)}
                    </Avatar>

                    <Typography noWrap>
                        {user?.name}
                    </Typography>
                </Box>

                <IconButton
                    onClick={logout}
                    sx={{
                        color: "black",
                    }}
                >
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    width: {
                        md: `calc(100% - ${drawerWidth}px)`,
                    },
                    ml: {
                        md: `${drawerWidth}px`,
                    },
                    bgcolor: "white",
                    color: "black",
                    boxShadow: 1,
                }}
            >
                <Toolbar>
                    <IconButton
                        onClick={() => setMobileOpen(true)}
                        sx={{
                            display: {
                                xs: "block",
                                md: "none",
                            },
                            mr: 2,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{fontWeight:"bold"}}
                    >
                        {user?.name}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{
                    width: {
                        md: drawerWidth,
                    },
                }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {
                            xs: "block",
                            md: "none",
                        },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: {
                            xs: "none",
                            md: "block",
                        },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            border: "none",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;