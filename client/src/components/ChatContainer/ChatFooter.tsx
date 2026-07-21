/**
 * Chat footer component (message input)
 */

import React, { useState, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { Button } from '../common/Button';
import { SendIcon, PaperclipIcon } from '../common/icons';
import './ChatFooter.css';

export const ChatFooter: React.FC = () => {
  const { sendMessage, sendFile } = useChat();
  const [message, setMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setIsSending(true);
      await sendMessage(message);
      setMessage('');
      inputRef.current?.focus();
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    try {
      setIsSending(true);
      await sendFile(file);
    } catch (err) {
      console.error('Failed to send file:', err);
    } finally {
      setIsSending(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <footer className="chat-footer glass">
      <div className="input-container">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={isSending}
        />
        <Button
          id="attach-btn"
          variant="secondary"
          circle
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending}
          title="Attach file (Max 5MB)"
          className="attach-button"
        >
          <PaperclipIcon size={20} />
        </Button>
        <input
          ref={inputRef}
          type="text"
          id="msg-input"
          className="message-input"
          placeholder="Type a secure message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isSending}
        />
        <Button
          id="send-btn"
          variant="primary"
          circle
          onClick={handleSend}
          disabled={!message.trim() || isSending}
        >
          <SendIcon size={20} />
        </Button>
      </div>
    </footer>
  );
};
