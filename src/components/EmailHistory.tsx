import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiData from "../../api/apidata";

interface Email {
  id: number;
  recipient: string;
  purpose: string;
  createdAt: string;
  content: string;
}

export default function EmailHistory() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate=useNavigate();

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                setLoading(true);
                const { data } = await apiData.get(
                    "/user/email/history"
                );
                setEmails(data.data);
            } catch (error) {
                setError("Unable to fetch emails");
            } finally {
                setLoading(false);
            }
        };
        fetchEmails();
    }, []);
    const handleOpenEmail = (id: number) => {
        navigate(`/history/${id}`);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Box sx={{p:4}}>
                    <Typography>Loading...</Typography>
                </Box>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <Box sx={{p:4}}>
                    <Typography color="error">
                        {error}
                    </Typography>
                </Box>
            </>
        );
    }
    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    bgcolor: "#f5f5f5",
                    minHeight: "100vh",
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 4,
                    }}
                >
        Email History
                </Typography>

                <Grid container spacing={3}>
                    {emails.map((email) => (
                        <Grid
                            key={email.id}
                            size={{ xs: 12, sm: 6, lg: 4 }}
                        >
                            <Card
                                elevation={2}
                                sx={{
                                    borderRadius: 3,
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleOpenEmail(email.id)}
                                >
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 2,
                                            }}
                                        >
                                            <Chip
                                                label={email.purpose}
                                                color="primary"
                                                size="small"
                                            />

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {email.createdAt}
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1,
                                            }}
                                        >
                                            {/* {email.subject} */}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mb: 2,
                                            }}
                                        >
                    To: {email.recipient}
                                        </Typography>

                                        <Divider sx={{ mb: 2 }} />

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {email.content}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}