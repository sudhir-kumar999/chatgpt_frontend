import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";

interface Session {
    id: string;
    session_name: string;
}

interface Props {
    session: Session[];
    onDelete: (id: string) => void;
}

const ChatSidebar = ({ session, onDelete }: Props) => {
    const location = useLocation();

    return (
        <List sx={{ px: 1 }}>
            {session.map((ses) => {
                const active = location.pathname === `/chat/${ses.id}`;

                return (
                    <ListItem
                        key={ses.id}
                        disablePadding
                        secondaryAction={
                            <IconButton
                                edge="end"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDelete(ses.id);
                                }}
                            >
                                <DeleteIcon
                                    sx={{
                                        color: active ? "white" : "black",
                                    }}
                                />
                            </IconButton>
                        }
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            "&:hover .delete-btn": {
                                opacity: 1,
                            },
                        }}
                    >
                        <ListItemButton
                            component={Link}
                            to={`/chat/${ses.id}`}
                            sx={{
                                borderRadius: 2,
                                bgcolor: active ? "#000" : "#fff",
                                color: active ? "#fff" : "#000",

                                "&:hover": {
                                    bgcolor: "#000",
                                    color: "#fff",
                                },

                                "&:hover + .MuiListItemSecondaryAction-root .delete-btn":
                                    {
                                        opacity: 1,
                                        color: "white",
                                    },
                            }}
                        >
                            <ListItemText
                                primary={ses.session_name}
                                slotProps={{
                                    primary: {
                                        noWrap: true,
                                    },
                                }}
                            />
                        </ListItemButton>

                        <IconButton
                            className="delete-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDelete(ses.id);
                            }}
                            sx={{
                                position: "absolute",
                                right: 8,
                                opacity: 0,
                                transition: "0.2s",
                                color: active ? "white" : "black",
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default ChatSidebar;