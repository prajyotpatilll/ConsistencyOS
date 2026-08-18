import { useCallback, useEffect, useState } from "react";
import { Plus, Briefcase } from "lucide-react";
import Layout from "../components/layout/Layout.jsx";
import Header from "../components/layout/Header.jsx";
import Loading from "../components/common/Loading.jsx";
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import JobStats from "../components/jobs/JobStats.jsx";
import JobForm from "../components/jobs/JobForm.jsx";
import JobCard from "../components/jobs/JobCard.jsx";
import { useToast } from "../hooks/useToast";
import jobService from "../services/job.service";

const Jobs = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await jobService.getApplications();
      setApplications(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const openAddModal = () => {
    setEditingJob(null);
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingJob) {
        await jobService.updateApplication(editingJob._id, payload);
        showToast("Application updated");
      } else {
        await jobService.createApplication(payload);
        showToast("Application added");
      }
      closeModal();
      loadApplications();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete application to "${job.companyName}"?`)) return;
    try {
      await jobService.deleteApplication(job._id);
      setApplications((prev) => prev.filter((j) => j._id !== job._id));
      showToast("Application deleted");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Layout>
      <Header title="Job Applications" subtitle="Every application you've sent" />

      <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
        <div className="mb-5">
          <JobStats applications={applications} />
        </div>

        <div className="mb-5 flex justify-end">
          <Button icon={Plus} onClick={openAddModal}>
            Add Application
          </Button>
        </div>

        {loading && <Loading label="Loading your applications..." />}

        {!loading && error && (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
            <p className="text-sm text-muted">Unable to load your applications.</p>
            <Button className="mt-4" onClick={loadApplications}>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <EmptyState
            icon={Briefcase}
            title="No applications yet"
            description="Log a job you applied to and start tracking your pipeline."
            actionLabel="Add your first application"
            onAction={openAddModal}
          />
        )}

        {!loading && !error && applications.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {applications.map((job) => (
              <JobCard
                key={job._id}
                job={job}
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
        title={editingJob ? "Edit Application" : "Add Job Application"}
        size="lg"
      >
        <JobForm
          initialData={editingJob}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>
    </Layout>
  );
};

export default Jobs;
