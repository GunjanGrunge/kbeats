'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }      // Clear form fields
      setEmail('');
      setSubject('');
      setMessage('');
      
      toast.success('Message sent successfully!', {
        style: {
          background: '#020126',
          color: '#F5F5F5',
          border: '1px solid #4CAF50'
        },
        duration: 3000,
      });
      onClose();
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      let errorMessage = 'Failed to send message. ';
      
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      
      toast.error(errorMessage, {
        style: {
          background: '#020126',
          color: '#F5F5F5',
          border: '1px solid #ff4b4b'
        },
        duration: 4000,
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">      <div className="bg-[#020126] rounded-lg p-8 w-full max-w-md relative border border-[#ECF241]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#DAF222]"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-white">Contact Us</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-[#8A8C87]">Your Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-[#A6A049] focus:border-[#ECF241] focus:ring-1 focus:ring-[#ECF241] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-[#8A8C87]">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-[#A6A049] focus:border-[#ECF241] focus:ring-1 focus:ring-[#ECF241] transition-colors"
              placeholder="Enter subject"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-[#8A8C87]">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-[#A6A049] focus:border-[#ECF241] focus:ring-1 focus:ring-[#ECF241] transition-colors resize-none"
              placeholder="Type your message here..."
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-[#DAF222] hover:bg-[#ECF241] text-[#020126] font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
