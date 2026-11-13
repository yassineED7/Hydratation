
import { useState, useRef, useEffect } from "react";
import {
  Bot, X, Send, Sparkles, MessageCircle,
  RotateCcw, ArrowUpRight
} from "lucide-react";
import "./ChatWidget.css";

const suggestions = [
  "What is ONDA?",
  "How does it work?",
  "How can I stay hydrated?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("onda");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! 👋 I'm ONDA AI. How can I help you today?"
    }
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function sendMessage(text = input) {
    const question = text.trim();

    if (!question || loading) return;

    const previous = messages.slice(1);

    setMessages((current) => [
      ...current,
      { role: "user", text: question }
    ]);

    setInput("");
    setLoading(true);

    try {
      const history = previous.slice(-12).map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        text: item.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `${mode === "onda" ? "[ONDA ASSISTANT MODE]" : "[GENERAL AI MODE]"} ${question}`,
          history
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to connect.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", text: data.answer }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: error.message || "Sorry, something went wrong."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function resetChat() {
    setMessages([
      {
        role: "assistant",
        text: "Hello! 👋 I'm ONDA AI. How can I help you today?"
      }
    ]);
  }

  return (
    <>
      <button
        className="chat-launcher"
        onClick={() => setOpen(!open)}
        aria-label="Open ONDA AI chat"
      >
        {open ? <X /> : <MessageCircle />}
        {!open && <span className="chat-launcher-dot" />}
      </button>

      {open && (
        <section className="onda-chat">
          <header className="chat-header">
            <div className="chat-brand">
              <div className="chat-avatar"><Bot size={22} /></div>
              <div>
                <strong>ONDA AI</strong>
                <span><i /> Online assistant</span>
              </div>
            </div>

            <div className="chat-header-actions">
              <button onClick={resetChat} aria-label="Reset chat">
                <RotateCcw size={17} />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={19} />
              </button>
            </div>
          </header>

          <div className="chat-mode">
            <button
              className={mode === "onda" ? "active" : ""}
              onClick={() => setMode("onda")}
            >
              <Sparkles size={14} /> ONDA
            </button>
            <button
              className={mode === "general" ? "active" : ""}
              onClick={() => setMode("general")}
            >
              General AI
            </button>
          </div>

          <div className="chat-messages">
            <div className="chat-welcome">
              <span className="welcome-sparkle">✳</span>
              <h3>Your hydration companion.</h3>
              <p>Ask me anything. I'm here to help.</p>
            </div>

            {messages.map((message, index) => {
              const rtl = /[\u0600-\u06FF]/.test(message.text);

              return (
                <div
                  key={index}
                  className={`chat-message ${message.role}`}
                  dir={rtl ? "rtl" : "auto"}
                >
                  {message.text}
                </div>
              );
            })}

            {loading && (
              <div className="chat-message assistant typing">
                <span />
                <span />
                <span />
              </div>
            )}

            {messages.length === 1 && (
              <div className="chat-suggestions">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => sendMessage(item)}
                  >
                    {item} <ArrowUpRight size={13} />
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            className="chat-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={loading}
              maxLength={2000}
            />
            <button disabled={!input.trim() || loading}>
              <Send size={17} />
            </button>
          </form>

          <div className="chat-footer">
            Powered by AI · ONDA experience
          </div>
        </section>
      )}
    </>
  );
}
