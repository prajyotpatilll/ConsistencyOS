import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Code2 } from "lucide-react";
import Layout from "../components/layout/Layout.jsx";
import Header from "../components/layout/Header.jsx";
import Loading from "../components/common/Loading.jsx";
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import DSAStats from "../components/dsa/DSAStats.jsx";
import DSAForm from "../components/dsa/DSAForm.jsx";
import DSAProblemCard from "../components/dsa/DSAProblemCard.jsx";
import { useToast } from "../hooks/useToast";
import dsaService from "../services/dsa.service";

const isToday = (date) => {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

const isThisWeek = (date) => {
  const d = new Date(date);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return d >= startOfWeek;
};

const DSA = () => {
  const { showToast } = useToast();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadProblems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await dsaService.getProblems();
      setProblems(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  const stats = useMemo(
    () => ({
      today: problems.filter((p) => isToday(p.solvedAt)).length,
      thisWeek: problems.filter((p) => isThisWeek(p.solvedAt)).length,
      total: problems.length,
    }),
    [problems]
  );

  const openAddModal = () => {
    setEditingProblem(null);
    setModalOpen(true);
  };

  const openEditModal = (problem) => {
    setEditingProblem(problem);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingProblem) {
        await dsaService.updateProblem(editingProblem._id, payload);
        showToast("Problem updated");
      } else {
        await dsaService.createProblem(payload);
        showToast("Problem added");
      }
      closeModal();
      loadProblems();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (problem) => {
    if (!window.confirm(`Delete "${problem.problemName}"?`)) return;
    try {
      await dsaService.deleteProblem(problem._id);
      setProblems((prev) => prev.filter((p) => p._id !== problem._id));
      showToast("Problem deleted");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Layout>
      <Header title="DSA Tracker" subtitle="Every problem you solve, logged" />

      <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
        <div className="mb-5">
          <DSAStats today={stats.today} thisWeek={stats.thisWeek} total={stats.total} />
        </div>

        <div className="mb-5 flex justify-end">
          <Button icon={Plus} onClick={openAddModal}>
            Add Problem
          </Button>
        </div>

        {loading && <Loading label="Loading your problems..." />}

        {!loading && error && (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
            <p className="text-sm text-muted">Unable to load your DSA problems.</p>
            <Button className="mt-4" onClick={loadProblems}>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && problems.length === 0 && (
          <EmptyState
            icon={Code2}
            title="No DSA problems solved yet"
            description="Log a problem you solved to start building your streak."
            actionLabel="Add your first problem"
            onAction={openAddModal}
          />
        )}

        {!loading && !error && problems.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {problems.map((problem) => (
              <DSAProblemCard
                key={problem._id}
                problem={problem}
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
        title={editingProblem ? "Edit Problem" : "Add DSA Problem"}
        size="lg"
      >
        <DSAForm
          initialData={editingProblem}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>
    </Layout>
  );
};

export default DSA;
