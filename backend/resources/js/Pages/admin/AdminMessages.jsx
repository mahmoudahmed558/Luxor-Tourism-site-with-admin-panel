// src/pages/Admin/AdminMessages.jsx
import { useState } from "react";
import { 
    Container, Row, Col, Card, Form, InputGroup, 
    Button, Table, Badge, Modal, Spinner 
} from "react-bootstrap";
import { 
    FaSearch, FaTrash, FaEnvelope, FaRegClock, FaEye 
} from "react-icons/fa";
import { usePage, router, Head } from "@inertiajs/react";
import AdminLayout from "../../Components/layout/AdminLayout";

const AdminMessages = () => {
    const { messages = [] } = usePage().props;
    
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Filter by name, email, or subject
    const filteredMessages = messages.filter((msg) =>
        msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        setDeletingId(id);
        
        router.delete(`/admin/messages/${id}`, {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    };

    const handleViewMessage = (msg) => {
        setSelectedMessage(msg);
        setShowModal(true);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', { 
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="admin-page-content py-4 px-3 px-md-4">
            <Head title="Egypt Tourism | Manage Messages" />
            <Container fluid>
                {/* Header Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                    <div>
                        <h3 className="fw-bold mb-1" style={{ color: "#1E293B" }}>
                            Contact Messages
                        </h3>
                        <p className="text-muted mb-0">View inquiries from the Contact Us page</p>
                    </div>

                    <div className="d-flex gap-2">
                        <InputGroup style={{ maxWidth: "300px" }}>
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaSearch className="text-muted" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search messages..."
                                className="border-start-0 ps-0"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </div>

                {/* Messages Table Card */}
                <Card className="border-0 shadow-sm" style={{ borderRadius: 15 }}>
                    <Card.Body className="p-0">
                        {filteredMessages.length === 0 ? (
                            <div className="text-center py-5">
                                <FaEnvelope size={48} className="text-muted opacity-25 mb-3" />
                                <h5 className="text-muted mb-1">No messages found</h5>
                                <p className="text-muted small">
                                    We haven't received any inquiries matching your search.
                                </p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <Table hover className="mb-0 align-middle">
                                    <thead style={{ background: "#F8FAFC" }}>
                                        <tr>
                                            <th className="ps-4 border-0 py-3 text-muted fw-semibold small">SENDER</th>
                                            <th className="border-0 py-3 text-muted fw-semibold small">SUBJECT</th>
                                            <th className="border-0 py-3 text-muted fw-semibold small">DATE</th>
                                            <th className="border-0 py-3 text-muted fw-semibold small text-end pe-4">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMessages.map((msg) => (
                                            <tr key={msg.id}>
                                                <td className="ps-4 py-3">
                                                    <div className="fw-semibold" style={{ color: "#1E293B" }}>
                                                        {msg.name}
                                                    </div>
                                                    <div className="text-muted small">
                                                        {msg.email}
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <Badge bg="light" text="dark" className="border px-2 py-1 mb-1 fw-normal">
                                                        {msg.subject || 'General Inquiry'}
                                                    </Badge>
                                                    <div className="text-muted small text-truncate" style={{ maxWidth: "250px" }}>
                                                        {msg.message}
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <div className="d-flex align-items-center gap-1 text-muted small">
                                                        <FaRegClock /> {formatDate(msg.created_at)}
                                                    </div>
                                                </td>
                                                <td className="py-3 text-end pe-4">
                                                    <Button 
                                                        variant="light" 
                                                        size="sm" 
                                                        className="me-2 text-primary rounded-circle"
                                                        onClick={() => handleViewMessage(msg)}
                                                        title="Read Message"
                                                    >
                                                        <FaEye />
                                                    </Button>
                                                    <Button 
                                                        variant="light" 
                                                        size="sm" 
                                                        className="text-danger rounded-circle"
                                                        onClick={() => handleDelete(msg.id)}
                                                        disabled={deletingId === msg.id}
                                                        title="Delete Message"
                                                    >
                                                        {deletingId === msg.id ? (
                                                            <Spinner as="span" animation="border" size="sm" />
                                                        ) : (
                                                            <FaTrash />
                                                        )}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </Card.Body>
                </Card>

                {/* Read Message Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="fw-bold" style={{ color: "#1E293B" }}>
                            Read Message
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-2">
                        {selectedMessage && (
                            <>
                                <Row className="mb-4 g-3">
                                    <Col sm={6}>
                                        <div className="p-3 bg-light rounded-3">
                                            <div className="small text-muted fw-semibold mb-1">FROM</div>
                                            <div className="fw-bold text-dark">{selectedMessage.name}</div>
                                            <div className="text-primary small">{selectedMessage.email}</div>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="p-3 bg-light rounded-3">
                                            <div className="small text-muted fw-semibold mb-1">DATE / TIME</div>
                                            <div className="fw-bold text-dark">{formatDate(selectedMessage.created_at)}</div>
                                        </div>
                                    </Col>
                                </Row>
                                
                                <div className="mb-3">
                                    <h6 className="fw-bold text-muted small">SUBJECT</h6>
                                    <p className="fs-5 fw-semibold text-dark mb-0">
                                        {selectedMessage.subject || 'General Inquiry'}
                                    </p>
                                </div>
                                
                                <div>
                                    <h6 className="fw-bold text-muted small">MESSAGE CONTENT</h6>
                                    <div 
                                        className="p-3 border rounded-3 bg-white text-dark" 
                                        style={{ whiteSpace: "pre-wrap", minHeight: "150px" }}
                                    >
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={() => {
                                handleDelete(selectedMessage.id);
                                setShowModal(false);
                            }}
                        >
                            Delete Message
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

AdminMessages.layout = page => <AdminLayout>{page}</AdminLayout>;
export default AdminMessages;
