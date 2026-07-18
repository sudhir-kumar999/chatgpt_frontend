import { useRef, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import apiData from "../../api/apidata";
import Markdown from "markdown-to-jsx/react";
import {  useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
interface Response{
    id:string
    role:string
    content:string
}

const ChatPage = () => {
    const sessionData=useParams();
    const {sessionId}=sessionData;
    const [message, setMessage] = useState<Response[]>([]);
    const [input,setInput]=useState("");
    const [loading,setLoading]=useState(false);
    const [loading2,setLoading2]=useState(false);

    async function fetchMessages() {
        try {
            setLoading(true);

            const res = await apiData.get(`/user/message/${sessionId}`);

            if (res.data.success) {
                setMessage(res.data.data);
            }
        } catch (err) {
            setMessage([]);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(()=>{
        setMessage([]);
        fetchMessages();
    },[sessionId]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [message]);
    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };
        setMessage(prev => [...prev, userMessage]);
        const userInput = input;
        setInput("");
        setLoading2(true);
        const res = await apiData.post("/user/chat", {
            message: userInput,
            sessionId,
        });
        if (res.data.success) {
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: res.data.data,
            };
            setMessage(prev => [...prev, aiMessage]);
        }
        setLoading2(false);
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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh - 60px)",
                paddingLeft:{md:"100px"}
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflow: "auto",
                    p: 2,
                }}
            >
                {message.length === 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Typography>Search Anything</Typography>
                    </Box>
                )}
                
                {message.map((msg:Response) => (
                    <Box
                        key={msg.id}
                        sx={{
                            display: "flex",
                            justifyContent:
                msg.role === "user"
                    ? "flex-end"
                    : "flex-start",
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                maxWidth: "70%",
                            }}
                        >
                            {msg.role === "assistant" && (
                                <Avatar
                                    sx={{
                                        mr: 1,
                                        bgcolor: "#10a37f",
                                    }}
                                >
                  AI
                                </Avatar>
                            )}

                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    bgcolor:
                    msg.role === "user"
                        ? "#1976d2"
                        : "#fff",
                                    color:
                    msg.role === "user"
                        ? "#fff"
                        : "#000",
                                }}
                            >

                                <Typography>
                                    {/* {loading2 && <p>Thinking...</p>} */}
                                    <Markdown>{msg.content}</Markdown> 
                                </Typography>
                            </Paper>

                            {msg.role === "user" && (
                                <Avatar sx={{ ml: 1 }}>
                  U
                                </Avatar>
                            )}
                        </Box>
                    </Box>
                ))}
                {loading2 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                maxWidth: "70%",
                            }}
                        >
                            <Avatar
                                sx={{
                                    mr: 1,
                                    bgcolor: "#10a37f",
                                }}
                            >
                AI
                            </Avatar>

                            <Paper
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                }}
                            >
                                <Typography>Thinking...</Typography>
                            </Paper>
                        </Box>
                    </Box>
                )}

                <div ref={bottomRef} />
            </Box>

            <Box
                sx={{
                    p: 2,
                    bgcolor: "#fff",
                    borderTop: "1px solid #ddd",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Ask anything..."
                        value={input}
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />

                    <IconButton
                        color="primary"
                        onClick={handleSend}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatPage;