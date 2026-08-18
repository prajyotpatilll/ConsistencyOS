import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, GraduationCap } from "lucide-react";
import Layout from "../components/layout/Layout.jsx";
import Header from "../components/layout/Header.jsx";
import Loading from "../components/common/Loading.jsx";
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import InterviewStats from "../components/interview/InterviewStats.jsx";
import InterviewForm from "../components/interview/InterviewForm.jsx";
import InterviewCard from "../components/interview/InterviewCard.jsx";
import { useToast } from "../hooks/useToast";
import interviewService from "../services/interview.service";

const isToday = (date) => {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

const Interview = () => {
  const { showToast } = useToast();
  const [preparations, setPreparations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadPreparations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await interviewService.getPreparations();
      setPreparations(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPreparations();
  }, [loadPreparations]);

  const todayStats = useMemo(() => {
    const todaySessions = preparations.filter((p) => isToday(p.preparedAt));
    return {
      sessionsToday: todaySessions.length,
      minutesToday: todaySessions.reduce((sum, s) => sum + (s.duration || 0), 0),
    };
  }, [preparations]);

  const openAddModal = () => {
    setEditingSession(null);
    setModalOpen(true);
  };

  const openEditModal = (session) => {
    setEditingSession(session);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingSession) {
        await interviewService.updatePreparation(editingSession._id, payload);
        showToast("Preparation updated");
      } else {
        await interviewService.createPreparation(payload);
        showToast("Preparation added");
      }
      closeModal();
      loadPreparations();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (session) => {
    if (!window.confirm(`Delete preparation on "${session.topic}"?`)) return;
    try {
      await interviewService.deletePreparation(session._id);
      setPreparations((prev) => prev.filter((s) => s._id !== session._id));
      showToast("Preparation deleted");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Layout>
      <Header title="Interview Preparation" subtitle="What you're studying, tracked" />

      <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
        <div className="mb-5">
          <InterviewStats
            minutesToday={todayStats.minutesToday}
            sessionsToday={todayStats.sessionsToday}
          />
        </div>

        <div className="mb-5 flex justify-end">
          <Button icon={Plus} onClick={openAddModal}>
            Add Preparation
          </Button>
        </div>

        {loading && <Loading label="Loading your preparation history..." />}

        {!loading && error && (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
            <p className="text-sm text-muted">Unable to load your preparation history.</p>
            <Button className="mt-4" onClick={loadPreparations}>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && preparations.length === 0 && (
          <EmptyState
            icon={GraduationCap}
            title="No preparation logged yet"
            description="Log a study session to start tracking your interview prep."
            actionLabel="Add your first session"
            onAction={openAddModal}
          />
        )}

        {!loading && !error && preparations.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {preparations.map((session) => (
              <InterviewCard
                key={session._id}
                session={session}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingSession ? "Edit Preparation" : "Add Interview Preparation"}
        size="lg"
      >
        <InterviewForm
          initialData={editingSession}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>
    </Layout>
  );
};

export default Interview;
