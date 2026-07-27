import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Markdown from "markdown-to-jsx";
import CircularProgress from "@mui/material/CircularProgress";
import apiData from "../../api/apidata";
import Navbar from "./Navbar";

export default function Summarizer() {
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");
    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selected = event.target.files?.[0];

        if (!selected) return;

        if (selected.type !== "application/pdf") {
            alert("Only PDF files are allowed.");
            return;
        }

        if (selected.size > 1024 * 1024) {
            alert("PDF size must be less than 1 MB.");
            return;
        }

        setFile(selected);
    };

    const handleSubmit = async () => {
        if (!text.trim() && !file) {
            alert("Please enter text or upload a PDF.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("text", text);
        if (file) {
            formData.append("pdf", file);
        }
        const res = await apiData.post(
            "/user/summarizer",
            formData
        );
        if (res.data.success) {
            setSummary(res.data.data);
        }
        setLoading(false);
    };
    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#f5f5f5",
                    py: 5,
                    px: 2,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 900,
                        mx: "auto",
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
          AI Text Summarizer
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
          Paste text or upload a PDF (maximum 1 MB) to generate a concise AI summary.
                    </Typography>

                    <TextField
                        fullWidth
                        multiline
                        rows={12}
                        label="Paste your text"
                        placeholder="Paste any article, notes, research paper or document..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFileIcon />}
                        >
            Upload PDF
                            <input
                                hidden
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                            />
                        </Button>

                        {file && (
                            <Chip
                                color="primary"
                                label={`${file.name} (${(
                                    file.size / 1024
                                ).toFixed(1)} KB)`}
                            />
                        )}
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={
                            loading ? (
                                <CircularProgress
                                    size={22}
                                    color="inherit"
                                />
                            ) : (
                                <SummarizeIcon />
                            )
                        }
                        sx={{
                            mt: 4,
                            py: 1.5,
                            fontWeight: 700,
                        }}
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? "Generating..." : "Generate Summary"}
                    </Button>
                </Paper>
                {summary && (
                    <Paper
                        elevation={2}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
            Summary
                        </Typography>

                        <Box
                            sx={{
                                "& h1": {
                                    fontSize: "2rem",
                                    fontWeight: 700,
                                    mb: 2,
                                },
                                "& h2": {
                                    fontSize: "1.5rem",
                                    fontWeight: 700,
                                    mb: 2,
                                },
                                "& h3": {
                                    fontSize: "1.2rem",
                                    fontWeight: 700,
                                    mb: 1,
                                },
                                "& p": {
                                    lineHeight: 1.8,
                                    mb: 2,
                                },
                                "& ul": {
                                    pl: 3,
                                },
                                "& ol": {
                                    pl: 3,
                                },
                                "& li": {
                                    mb: 1,
                                },
                            }}
                        >
                            <Markdown>{summary}</Markdown>
                        </Box>
                    </Paper>
                )}
            </Box>
        </>
    );
}