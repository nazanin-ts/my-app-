import { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { IoDocumentAttachOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import pdfToText from "../utils/pdfToText";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [questionInput, setQuestionInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    const userMessage = { sender: 'user', text: questionInput };
    setMessages(prev => [...prev, userMessage]);
    setQuestionInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://cs595-project.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionInput }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.answer || 'Something went wrong.' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error fetching response.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF.");
      return;
    }

    setIsUploading(true);
    try {
      const text = await pdfToText(file);

      // Save parsed notes to backend
      await fetch("https://cs595-project.onrender.com/api/save-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Notes uploaded and saved successfully." }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Failed to upload or parse notes." }
      ]);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div id="chatbot" className="container-fluid d-flex flex-column p-3">
      <div id="chatbot-box" ref={chatRef} className="flex-grow-1 overflow-auto p-3 bg-light rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-2 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
          >
            <div
              className={`p-2 rounded text-white ${msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'}`}
              style={{ maxWidth: '70%' }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-muted small">Chatbot is thinking...</div>
        )}
      </div>
      <Form onSubmit={handleSubmit} className="pt-3">
        <div className="d-flex align-items-center justify-content-between gap-2">
          <Form.Control type="text" placeholder="Type Your Question Here..." value={questionInput} onChange={(e) => setQuestionInput(e.target.value)}></Form.Control>
          <input type="file" accept=".pdf" ref={fileInputRef} className="d-none" onChange={handleFileChange} />
          <Button variant="warning" className="d-flex btn btn-warning align-items-center justify-content-between gap-2" style={{ textWrap: "nowrap" }} onClick={handleUploadClick}>
            <IoDocumentAttachOutline size={18} />
            {isUploading ? (
              <>
                Uploading <Spinner size="sm" animation="border" />
              </>
            ) : (
              "Upload Notes"
            )}
          </Button>
          <Button type="submit" variant="primary" className="d-flex btn btn-primary align-items-center justify-content-between gap-2">
            <BsSend size={18} />
            {isLoading ? (
              <>
                Sending <Spinner size="sm" animation="border" />
              </>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Chatbot