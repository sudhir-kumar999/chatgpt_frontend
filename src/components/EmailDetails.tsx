import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import apiData from "../../api/apidata";
interface Email {
  id: string;
  subject: string;
  recipient: string;
  purpose: string;
  content: string;
  createdAt: string;
}
export default function EmailDetails() {
    const [email, setEmail] = useState<Email | null>(null);

    const { id } = useParams();
    useEffect(() => {
        const fetchEmail = async () => {
            const { data } = await apiData.get(
                `/user/email/${id}`
            );
            setEmail(data.data);
        };
        if (id) {
            fetchEmail();
        }
    }, [id]);
    if (!email) {
        return (
            <>
                <Navbar />
                <Typography sx={{p:4}}>Loading...</Typography>
            </>
        );
    };

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#f5f5f5",
                    p: 4,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 900,
                        mx: "auto",
                        p: 5,
                        borderRadius: 3,
                    }}
                >
                    {/* <Typography variant="h4" sx={{fontWeight:700}}>
                        {email.subject}
                    </Typography> */}

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        {email.createdAt}
                    </Typography>

                    <Box
                        sx={{
                            "& h1": {
                                fontSize: "2rem",
                                fontWeight: 700,
                                mb: 2,
                                mt: 3,
                            },
                            "& h2": {
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                mb: 2,
                                mt: 3,
                            },
                            "& h3": {
                                fontSize: "1.25rem",
                                fontWeight: 600,
                                mb: 1,
                                mt: 2,
                            },
                            "& p": {
                                fontSize: "1rem",
                                lineHeight: 1.9,
                                mb: 2,
                            },
                            "& strong": {
                                fontWeight: 700,
                            },
                            "& em": {
                                fontStyle: "italic",
                            },
                            "& ul": {
                                pl: 3,
                                mb: 2,
                            },
                            "& ol": {
                                pl: 3,
                                mb: 2,
                            },
                            "& li": {
                                mb: 1,
                            },
                            "& blockquote": {
                                borderLeft: "4px solid",
                                borderColor: "primary.main",
                                pl: 2,
                                py: 1,
                                my: 2,
                                bgcolor: "grey.100",
                            },
                            "& code": {
                                bgcolor: "grey.200",
                                px: 0.5,
                                py: 0.25,
                                borderRadius: 1,
                                fontFamily: "monospace",
                            },
                            "& pre": {
                                bgcolor: "#1e1e1e",
                                color: "#fff",
                                p: 2,
                                borderRadius: 2,
                                overflowX: "auto",
                            },
                        }}
                    >
                        <Markdown>{email.content}</Markdown>
                    </Box>

                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() =>
                                navigator.clipboard.writeText(email.content)
                            }
                        >
            Copy
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>

    );
}