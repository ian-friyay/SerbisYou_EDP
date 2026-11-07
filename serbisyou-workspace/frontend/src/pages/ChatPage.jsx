import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { useSocket } from '../context/SocketContext';

export default function ChatPage() {
  const { socket, connected } = useSocket();
  const [room, setRoom] = useState('serbisyou-general');
  const [messages, setMessages] = useState([
    {
      senderName: 'System',
      message: 'Welcome to the SerbisYou campus chat room! Connect with providers in real time.',
      timestamp: new Date().toLocaleTimeString(),
      isSystem: true,
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [senderName, setSenderName] = useState('Student_' + Math.floor(1000 + Math.random() * 9000));

  useEffect(() => {
    if (!socket) return;

    socket.emit('join_room', room);

    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, room]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !socket) return;

    const msgData = {
      roomId: room,
      senderId: socket.id,
      senderName,
      message: inputMsg.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.emit('send_message', msgData);
    setInputMsg('');
  };

  return (
    <Container className="py-4" style={{ maxWidth: '800px' }}>
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center py-3">
          <div>
            <h5 className="mb-0 fw-bold">💬 Real-Time Campus Chat</h5>
            <small>Room: #{room}</small>
          </div>
          <div>
            Status:{' '}
            <Badge bg={connected ? 'success' : 'danger'}>
              {connected ? 'Connected' : 'Connecting...'}
            </Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="mb-3 d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Your Name / Handle"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              style={{ maxWidth: '240px' }}
            />
            <Form.Select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              style={{ maxWidth: '240px' }}
            >
              <option value="serbisyou-general">#general-inquiries</option>
              <option value="transaction-tx101">#transaction-sample-101</option>
              <option value="creative-support">#creative-support</option>
            </Form.Select>
          </div>

          <div className="chat-box mb-3">
            {messages.map((m, idx) => {
              const isMe = m.senderName === senderName;
              if (m.isSystem) {
                return (
                  <div key={idx} className="text-center text-muted small my-2">
                    <em>{m.message}</em>
                  </div>
                );
              }
              return (
                <div key={idx} className={`chat-message ${isMe ? 'sent' : 'received'}`}>
                  <div className="small fw-bold opacity-75">{m.senderName}</div>
                  <div>{m.message}</div>
                  <div className="text-end small opacity-50" style={{ fontSize: '0.7rem' }}>
                    {m.timestamp}
                  </div>
                </div>
              );
            })}
          </div>

          <Form onSubmit={handleSend}>
            <InputGroup>
              <Form.Control
                placeholder="Type your message to the student..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                disabled={!connected}
              />
              <Button variant="primary" type="submit" disabled={!connected || !inputMsg.trim()}>
                Send
              </Button>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
