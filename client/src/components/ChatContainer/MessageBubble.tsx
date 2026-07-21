/**
 * Message bubble component
 */

import React from 'react';
import { Message } from '../../types/index';
import { formatMessageTime } from '../../utils/messageHandling';
import './MessageBubble.css';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isImage = message.file?.type.startsWith('image/');

  return (
    <div className={`message ${message.type}`}>
      {message.file && (
        <div className="message-file">
          {isImage ? (
            <img src={message.file.data} alt={message.file.name} className="message-image" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }} />
          ) : (
            <a href={message.file.data} download={message.file.name} className="message-download-link" style={{ display: 'block', padding: '8px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '4px', marginBottom: '8px', textDecoration: 'none', color: 'inherit' }}>
              📎 {message.file.name} ({(message.file.size / 1024).toFixed(1)} KB)
            </a>
          )}
        </div>
      )}
      {message.text && <div className="message-text">{message.text}</div>}
      <div className="message-meta">
        <span>{message.sender.substring(0, 8)}...</span>
        <span>{formatMessageTime(message.timestamp)}</span>
      </div>
    </div>
  );
};
