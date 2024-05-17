import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { API_URL } from "../../utils/apiConfig";
import "./Chat.css";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "white",
  },
  chatHeader: {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    display: "flex",
    alignItems: "",
    justifyContent: "",
    backgroundColor: "#f2f2f2",
    color: "#000033",
  },
  logo: {
    height: "64px",
    width: "auto",
    marginRight: "16px",
  },
  chatHistory: {
    flex: 1,
    overflowY: "auto",
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.grey["300"]}`,
  },
  chatInputContainer: {
    padding: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  chatInput: {
    flex: 1,
    marginRight: theme.spacing(2),
    backgroundColor: "white",
    padding: theme.spacing(1, 5),
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderRadius: theme.shape.borderRadius,
  },
  chatSubmit: {
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderRadius: theme.shape.borderRadius,
    color: "black",
    "&:hover": {
      backgroundColor: "#43919D",
      color: theme.palette.primary.contrastText,
    },
  },
  chatClear: {
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderRadius: theme.shape.borderRadius,
    color: "black",
    "&:hover": {
      backgroundColor: "#43919D",
      color: theme.palette.primary.contrastText,
    },
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isSending) {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: inputValue },
    ]);
    try {
      const response = await axios.post(`"${API_URL}/api/get-response"`, {
        question: inputValue,
      });

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: response.data.response },
        ]);
        setIsSending(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "An error occurred." },
      ]);
      setIsSending(false);
    }
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatHistory}>
        <div className="chat-indicator">
          {isSending && <div className="typing-indicator">Typing...</div>}
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <div className="chat-message-avatar">
                <img
                  src={
                    message.role === "user"
                      ? "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                      : "https://test.digitalt3.com/wp-content/uploads/2023/11/cropped-cropped-DT3_wobg.png"
                  }
                  alt={message.role}
                />
              </div>
              <div className="chat-message-content">
                <div className="chat-message-label">
                  {message.role === "user" ? "You" : "Bot"}
                </div>
                <div className="chat-message-text">{message.content}</div>
                <div className="chat-message-timestamp">
                  {new Date(Date.now() - (messages.length - index - 1) * 5000)
                    .toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-scrollbar">
          <div className="chat-scrollbar-thumb" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className={classes.chatInputContainer}>
        <TextField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={classes.chatInput}
          placeholder="Type your message here..."
          disabled={isSending}
        />
        <Button
          type="submit"
          className={classes.chatSubmit}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </Button>
      </form>
      <div className="chat-controls">
        <Button
          variant="contained"
          className={classes.chatClear}
          onClick={() => setMessages([])}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Chat;