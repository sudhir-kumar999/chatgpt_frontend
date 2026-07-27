import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmailIcon from "@mui/icons-material/Email";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const features = [
    {
        title: "Chat Bot",
        icon: <SmartToyIcon sx={{ fontSize: 60 }} />,
        path: "/chatgpt/user/dashboard",
    },
    {
        title: "Chat with Images",
        icon: <AddPhotoAlternateIcon sx={{ fontSize: 60 }} />,
        path: "/vision",
    },
    {
        title: "AI Email Generator",
        icon: <EmailIcon sx={{ fontSize: 60 }} />,
        path: "/email",
    },
    {
        title: "AI Summarizer",
        icon: <SummarizeIcon sx={{ fontSize: 60 }} />,
        path: "/summarizer",
    },
];

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <Box>
            <Navbar />

            <Box
                sx={{
                    minHeight: "calc(100vh - 70px)",
                    px: { xs: 2, md: 5 },
                    py: 6,
                    bgcolor: "#f8fafc",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        mb: 1,
                        fontSize: { xs: "2rem", md: "2.8rem" },
                    }}
                >
          AI Workspace
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        textAlign: "center",
                        mb: 6,
                        maxWidth: 650,
                        mx: "auto",
                    }}
                >
          Choose an AI tool to start chatting, analyze images,
          generate professional emails, or summarize documents.
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {features.map((feature) => (
                        <Grid
                            key={feature.title}
                            size={{ xs: 12, sm: 6, md: 3 }}
                        >
                            <Paper
                                elevation={2}
                                onClick={() => navigate(feature.path)}
                                sx={{
                                    cursor: "pointer",
                                    height: 220,
                                    borderRadius: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                {feature.icon}

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "center",
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}