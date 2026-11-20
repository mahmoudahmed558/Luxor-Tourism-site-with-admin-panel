// src/pages/admin/AdminPrograms.jsx
import { useState } from "react";
import {
    Container, Row, Col, Card, Button, Modal, Badge,
    Spinner, Alert
} from "react-bootstrap";
import {
    FaPlus, FaEdit, FaTrash, FaImages, FaClock,
    FaMapMarkerAlt, FaTag, FaExclamationTriangle
} from "react-icons/fa";
import { usePrograms } from "../../hooks/usePrograms";
import { deleteProgram } from "../../services/programService";
import ProgramForm from "../../components/admin/ProgramForm";

const AdminPrograms = ({ lang = "ar" }) => {
    const isRTL = lang === "ar";
    const { programs, loading, error } = usePrograms();

    const [showForm, setShowForm] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [notification, setNotification] = useState(null);

    const lb = {
        ar: {
            title: "إدارة البرامج", add: "إضافة برنامج",
            edit: "تعديل", delete: "حذف",
            days: "يوم", egp: "ج.م", discount: "خصم",
            confirmDelete: "هل أنت متأكد من حذف هذا البرنامج؟",
            deleteBtn: "حذف", cancel: "إلغاء",
            deleteSuccess: "تم حذف البرنامج بنجاح",
            saveSuccess: "تم حفظ البرنامج بنجاح",
            noPrograms: "لا توجد برامج بعد. أضف أول برنامج!",
            photos: "صور",
        },
        en: {
            title: "Manage Programs", add: "Add Program",
            edit: "Edit", delete: "Delete",
            days: "days", egp: "EGP", discount: "OFF",
            confirmDelete: "Are you sure you want to delete this program?",
            deleteBtn: "Delete", cancel: "Cancel",
            deleteSuccess: "Program deleted successfully",
            saveSuccess: "Program saved successfully",
            noPrograms: "No programs yet. Add the first one!",
            photos: "photos",
        },
    };
    const t = lb[lang] || lb.en;

    const notify = (msg, type = "success") => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteProgram(deleteTarget.id);
            setDeleteTarget(null);
            notify(t.deleteSuccess);
        } catch (err) {
            notify(err.message, "danger");
        } finally {
            setDeleting(false);
        }
    };

    const getTitle = (p) =>
        typeof p.title === "object" ? p.title[lang] || p.title.ar || p.title.en : p.title;

    const getDesc = (p) =>
        typeof p.description === "object" ? p.description[lang] || p.description.ar || p.description.en : p.description;

    return (
        <div dir={isRTL ? "rtl" : "ltr"}>
            {notification && (
                <Alert variant={notification.type} className="rounded-3 py-2 mb-3" dismissible onClose={() => setNotification(null)}>
                    {notification.msg}
                </Alert>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">{t.title}</h5>
                <Button className="book-btn rounded-pill px-3" onClick={() => { setEditTarget(null); setShowForm(true); }}>
                    <FaPlus className="me-1" /> {t.add}
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : programs.length === 0 ? (
                <div className="text-center py-5">
                    <FaImages size={48} className="text-muted mb-3 opacity-50" />
                    <p className="text-muted">{t.noPrograms}</p>
                </div>
            ) : (
                <Row className="g-3">
                    {programs.map((p) => {
                        const hasDiscount = p.discount > 0;
                        const finalPrice = hasDiscount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
                        return (
                            <Col key={p.id} xs={12} sm={6} xl={4}>
                                <Card className="admin-program-card border-0 shadow-sm h-100">
                                    {/* Cover image */}
                                    <div className="admin-program-img-wrapper">
                                        {p.images?.[0] ? (
                                            <img src={p.images[0]} alt={getTitle(p)} className="admin-program-img" />
                                        ) : (
                                            <div className="admin-program-img-placeholder d-flex align-items-center justify-content-center">
                                                <FaImages size={32} className="text-muted opacity-40" />
                                            </div>
                                        )}
                                        {hasDiscount && (
                                            <div className="discount-badge">{p.discount}% {t.discount}</div>
                                        )}
                                        {p.images?.length > 1 && (
                                            <div className="admin-img-count">
                                                <FaImages size={11} className="me-1" />
                                                {p.images.length} {t.photos}
                                            </div>
                                        )}
                                    </div>
                                    <Card.Body className="p-3">
                                        <h6 className="fw-bold mb-1">{getTitle(p)}</h6>
                                        <p className="text-muted small mb-2 program-description">{getDesc(p)}</p>
                                        <div className="d-flex flex-wrap gap-1 mb-2">
                                            {p.duration > 0 && (
                                                <span className="program-meta-tag"><FaClock size={10} className="me-1" />{p.duration} {t.days}</span>
                                            )}
                                            {p.locations?.slice(0, 2).map((loc, i) => (
                                                <span key={i} className="program-meta-tag">
                                                    <FaMapMarkerAlt size={10} className="me-1" />
                                                    {typeof loc === "object" ? loc[lang] || loc.ar : loc}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                {hasDiscount && (
                                                    <span className="text-muted text-decoration-line-through small me-2">
                                                        {p.price} {t.egp}
                                                    </span>
                                                )}
                                                <span className="fw-bold text-primary">{finalPrice} {t.egp}</span>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    className="rounded-pill px-3"
                                                    onClick={() => { setEditTarget(p); setShowForm(true); }}
                                                >
                                                    <FaEdit size={12} className="me-1" />{t.edit}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    className="rounded-pill px-3"
                                                    onClick={() => setDeleteTarget(p)}
                                                >
                                                    <FaTrash size={12} className="me-1" />{t.delete}
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}

            {/* Create / Edit Modal */}
            <Modal show={showForm} onHide={() => setShowForm(false)} size="xl" centered scrollable dir={isRTL ? "rtl" : "ltr"}>
                <Modal.Header closeButton className="border-0 booking-modal-header">
                    <Modal.Title className="text-white">
                        {editTarget ? t.edit : t.add}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <ProgramForm
                        existing={editTarget}
                        lang={lang}
                        onSaved={() => { setShowForm(false); notify(t.saveSuccess); }}
                        onCancel={() => setShowForm(false)}
                    />
                </Modal.Body>
            </Modal>

            {/* Delete Confirm Modal */}
            <Modal show={!!deleteTarget} onHide={() => setDeleteTarget(null)} centered dir={isRTL ? "rtl" : "ltr"}>
                <Modal.Body className="text-center p-5">
                    <FaExclamationTriangle size={48} className="text-warning mb-3" />
                    <h5 className="fw-bold mb-2">{t.confirmDelete}</h5>
                    <p className="text-muted small mb-4 fw-semibold">{deleteTarget && getTitle(deleteTarget)}</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button variant="light" className="rounded-pill px-4" onClick={() => setDeleteTarget(null)}>{t.cancel}</Button>
                        <Button variant="danger" className="rounded-pill px-4" onClick={handleDelete} disabled={deleting}>
                            {deleting ? <Spinner as="span" size="sm" /> : <><FaTrash className="me-1" />{t.deleteBtn}</>}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminPrograms;
