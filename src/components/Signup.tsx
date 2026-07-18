import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import apiData from "../../api/apidata";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await apiData.post("/user/signup", formData);

            if (res.data.success) {
                navigate("/userlogin");
            } else {
                setError(res.data.message);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || "Signup failed"
                );
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f7f7f8",
                padding: "16px",
            }}
        >
            <Paper
                elevation={3}
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    padding: "32px",
                    borderRadius: "16px",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{fontWeight:"bold",textAlign:"center"}}
                >
          Create Account
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{mt:1,mg:3,textAlign:"center"}}

                >
          Sign up to start chatting with AI
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    {error && (
                        <Typography
                            color="error"
                            sx={{mt:2,textAlign:"center"}}

                        >
                            {error}
                        </Typography>
                    )}

                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        margin="normal"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        loading={loading}
                        style={{
                            marginTop: "24px",
                        }}
                    >
            Sign Up
                    </Button>

                    <Typography
                        sx={{mt:3,textAlign:"center"}}
                        variant="body2"
                    >
            Already have an account?{" "}
                        <Link
                            to="/login"
                            style={{
                                textDecoration: "none",
                                fontWeight: 600,
                            }}
                        >
              Login
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Signup;