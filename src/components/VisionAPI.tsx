import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Markdown from "markdown-to-jsx/react";
import { useEffect, useRef, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import apiData from "../../api/apidata";
interface Response{
    id:string
    image?: {
    localUrl?: string;
    remoteUrl?: string;
  };
    role:string
    content:string
}
const VisionAPI = () => {
    const [message, setMessage] = useState<Response[]>([]);
    const [input,setInput]=useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    const [file, setFile] = useState<File|null>(null);
    const [previewUrl, setPreviewUrl] = useState<string|null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            if (file.type.startsWith("image/")) {
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);
    
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [message]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleSend=async()=>{
        try {
            const formData=new FormData();
            if (!input.trim()) return;
            const userInput = input;
            setInput("");
            const userMessage: Response = {
                id: Date.now().toString(),
                role: "user",
                content: userInput,
                image: {
                    localUrl: previewUrl ?? undefined,
                    remoteUrl: undefined,
                },
            };
            const assistantId = (Date.now() + 1).toString();
            setMessage(prev => [
                ...prev,
                userMessage,
                {
                    id: assistantId,
                    role: "assistant",
                    content: "",
                },
            ]);
            if(!file){
                alert("please select a file");
                return;
            }
            const userInputs = input;
            formData.append("image",file ?? "");
            formData.append("query",userInputs);
            const res=await apiData.post("/user/vision",formData);
            if (res.data.success) {
                setMessage(prev =>
                    prev.map(msg => {
                        if (msg.id === userMessage.id) {
                            return {
                                ...msg,
                                image: {
                                    ...msg.image,
                                    remoteUrl: res.data.image_url,
                                },
                            };
                        }
                        if (msg.id === assistantId) {
                            return {
                                ...msg,
                                content: res.data.data,
                            };
                        }
                        return msg;
                    })
                );
            }
            setFile(null);
            setPreviewUrl(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        getVisionHistory();
    }, []);

    const getVisionHistory = async () => {
        const res = await apiData.get("/user/vision/history");
        if (res.data.success) {
            const formatted = res.data.data.map((item: { id: string; role: string; content: string; imageUrl: string; }) => ({
                id: item.id,
                role: item.role,
                content: item.content,
                image: item.imageUrl
                    ? {
                        remoteUrl: item.imageUrl,
                    }
                    : undefined,
            }));
            setMessage(formatted);
        }
    };
    return (
        <Box>
            <Navbar/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "calc(100vh - 80px)",
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
                                    {msg.image && (
                                        <Box
                                            component="img"
                                            src={msg.image.remoteUrl ?? msg.image.localUrl}
                                            sx={{
                                                width: 150,
                                                borderRadius: 2,
                                                mb: 1,
                                            }}
                                        />
                                    )}
                                    <Typography>
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
                    ><Box>
                            {previewUrl && (
                                <Box
                                    component="img"
                                    src={previewUrl}
                                    alt="Preview"
                                    sx={{
                                        width: "100%",
                                        maxHeight: 100,
                                        maxWidth:100,
                                        objectFit: "contain",
                                        borderRadius: 1,
                                        boxShadow: 2,
                                        mt: 1,
                                        position:"absolute",
                                        bottom:100
                                    }}
                                />
                            )}
                        </Box>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<UploadFileIcon />}
                        >
        Select Image
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                hidden
                                onChange={(event)=>handleChange(event)}

                            />
                        </Button>
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
        </Box>
    );
};

export default VisionAPI;
