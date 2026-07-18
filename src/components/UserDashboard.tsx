import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import apiData from "../../api/apidata";

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleNewChat = async () => {
        const res = await apiData.post("/user/session");
        if (res.data.success) {
            navigate(`/chat/${res.data.data.id}`);
        }
    };
    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f7f7f8",
                p: 3,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 600,
                    width: "100%",
                    p: 5,
                    borderRadius: 4,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{fontWeight:"bold"}}
                    gutterBottom
                >
                    Welcome 
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Start a new conversation with your AI assistant or
                    continue one of your previous chats from the sidebar.
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="large"
                    onClick={handleNewChat}
                >
    Start New Chat
                </Button>
            </Paper>
        </Box>
    );
};

export default UserDashboard;