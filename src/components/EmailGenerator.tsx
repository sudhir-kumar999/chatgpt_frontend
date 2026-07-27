import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";
import apiData from "../../api/apidata";
import { useNavigate } from "react-router-dom";
interface FormData {
  recipient: string;
  purpose: string;
  details: string;
  tone: string;
  length: string;
  language: string;
  instructions: string;
}

const EmailGenerator=()=> {
    const [formData, setFormData] = useState<FormData>({
        recipient: "",
        purpose: "",
        details: "",
        tone: "",
        length: "",
        language: "English",
        instructions: "",
    });
    const navigate=useNavigate();
    const handleChange = (
        e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async() => {
        await apiData.post("/user/email",formData);
    };
    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#f5f5f5",
                    py: 5,
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
                    <Typography variant="h4" sx={{fontWeight:700,mb:1}}>
          AI Email Generator
                    </Typography>

                    <Typography color="text.secondary" sx={{mb:4}}>
          Fill the details below and let AI generate a professional email.
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Recipient</InputLabel>
                                <Select
                                    name="recipient"
                                    value={formData.recipient}
                                    label="Recipient"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                    <MenuItem value="Recruiter">Recruiter</MenuItem>
                                    <MenuItem value="Professor">Professor</MenuItem>
                                    <MenuItem value="Client">Client</MenuItem>
                                    <MenuItem value="Coworker">Coworker</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Email Purpose</InputLabel>
                                <Select
                                    name="purpose"
                                    value={formData.purpose}
                                    label="Email Purpose"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Leave Request">Leave Request</MenuItem>
                                    <MenuItem value="Job Application">Job Application</MenuItem>
                                    <MenuItem value="Meeting Request">Meeting Request</MenuItem>
                                    <MenuItem value="Follow Up">Follow Up</MenuItem>
                                    <MenuItem value="Complaint">Complaint</MenuItem>
                                    <MenuItem value="Apology">Apology</MenuItem>
                                    <MenuItem value="Thank You">Thank You</MenuItem>
                                    <MenuItem value="Project Update">Project Update</MenuItem>
                                    <MenuItem value="Resignation">Resignation</MenuItem>
                                    <MenuItem value="Custom">Custom</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                label="Describe your email"
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                placeholder="Example: I missed yesterday's meeting because I was ill. Apologize and request another meeting this week."
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Tone</InputLabel>
                                <Select
                                    name="tone"
                                    value={formData.tone}
                                    label="Tone"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Professional">Professional</MenuItem>
                                    <MenuItem value="Formal">Formal</MenuItem>
                                    <MenuItem value="Friendly">Friendly</MenuItem>
                                    <MenuItem value="Casual">Casual</MenuItem>
                                    <MenuItem value="Persuasive">Persuasive</MenuItem>
                                    <MenuItem value="Polite">Polite</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Length</InputLabel>
                                <Select
                                    name="length"
                                    value={formData.length}
                                    label="Length"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Short">Short</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Detailed">Detailed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Language</InputLabel>
                                <Select
                                    name="language"
                                    value={formData.language}
                                    label="Language"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="English">English</MenuItem>
                                    <MenuItem value="Hindi">Hindi</MenuItem>
                                    <MenuItem value="Hinglish">Hinglish</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Additional Instructions (Optional)"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                placeholder="Mention resume attachment, keep under 150 words, etc."
                            />
                        </Grid>

                        <Grid size={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleSubmit}
                                sx={{
                                    py: 1.6,
                                    fontSize: 16,
                                    fontWeight: 700,
                                }}
                            >
              Generate Email
                            </Button>
                            
                        </Grid>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={()=>navigate("/history")}
                            sx={{
                                py: 1.6,
                                fontSize: 16,
                                fontWeight: 700,
                            }}
                        >
              View Emails
                        </Button>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default EmailGenerator;