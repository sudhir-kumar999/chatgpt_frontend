import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f7f7f8",
                display: "flex",
                flexDirection: "column",
            }}
        >

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    px: 2,
                    textAlign: "center",
                }}
            >

                <Typography variant="h2" sx={{fontWeight:"bold",mt:2}}>
          Welcome to AI Assistant
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ maxWidth: 700, mt: 2 }}
                >
          Ask questions, generate code, summarize documents, and get instant
          AI-powered responses anytime.
                </Typography>

                <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="large"
                    sx={{ mt: 5, px: 5, py: 1.5 }}
                >
          Start Chatting
                </Button>
            </Box>

        </Box>
    );
};

export default Home;