import { useCallback, useEffect, useState } from "react";
import { ListChecks, Code2, Briefcase, GraduationCap, Plus } from "lucide-react";
import Layout from "../components/layout/Layout.jsx";
import Header from "../components/layout/Header.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import ProgressCard from "../components/dashboard/ProgressCard.jsx";
import RecentActivity from "../components/dashboard/RecentActivity.jsx";
import Loading from "../components/common/Loading.jsx";
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import TaskForm from "../components/tasks/TaskForm.jsx";
import DSAForm from "../components/dsa/DSAForm.jsx";
import JobForm from "../components/jobs/JobForm.jsx";
import InterviewForm from "../components/interview/InterviewForm.jsx";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import dashboardService from "../services/dashboard.service";
import taskService from "../services/task.service";
import dsaService from "../services/dsa.service";
import jobService from "../services/job.service";
import interviewService from "../services/interview.service";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'task' | 'dsa' | 'job' | 'interview'
  const [submitting, setSubmitting] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await dashboardService.getDashboard();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const closeModal = () => setActiveModal(null);

  const handleQuickAdd = async (type, payload) => {
    setSubmitting(true);
    try {
      if (type === "task") await taskService.createTask(payload);
      if (type === "dsa") await dsaService.createProblem(payload);
      if (type === "job") await jobService.createApplication(payload);
      if (type === "interview") await interviewService.createPreparation(payload);

      showToast("Added successfully");
      closeModal();
      loadDashboard();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <Layout>
      <Header
        title={`${greeting()}, ${user?.name?.split(" ")[0] || "there"} 👋`}
        subtitle={todayDate}
      />

      <div className="mx-auto max-w-5xl px-5 py-6 md:px-8">
        {loading && <Loading label="Loading your dashboard..." />}

        {!loading && error && (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
            <p className="text-sm text-muted">Unable to load your dashboard.</p>
            <Button className="mt-4" onClick={loadDashboard}>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && data && (
          <div className="space-y-6">
            <ProgressCard
              completed={data.today.tasks.completed}
              total={data.today.tasks.total}
              progress={data.today.tasks.progress}
            />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard
                icon={ListChecks}
                label="Tasks"
                value={`${data.today.tasks.completed}/${data.today.tasks.total}`}
                sublabel="completed today"
                color="brand"
              />
              <StatCard
                icon={Code2}
                label="DSA"
                value={data.today.dsaSolved}
                sublabel="solved today"
                color="teal"
              />
              <StatCard
                icon={Briefcase}
                label="Jobs"
                value={data.today.jobApplications}
                sublabel="applied today"
                color="amber"
              />
              <StatCard
                icon={GraduationCap}
                label="Interview"
                value={`${data.today.interviewPreparation.minutes}m`}
                sublabel={`${data.today.interviewPreparation.sessions} sessions`}
                color="violet"
              />
            </div>

            <div>
              <h3 className="mb-3 font-display text-sm font-semibold text-ink">
                Quick actions
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  icon={Plus}
                  onClick={() => setActiveModal("task")}
                >
                  Task
                </Button>
                <Button
                  variant="secondary"
                  icon={Plus}
                  onClick={() => setActiveModal("dsa")}
                >
                  DSA Problem
                </Button>
                <Button
                  variant="secondary"
                  icon={Plus}
                  onClick={() => setActiveModal("job")}
                >
                  Job Application
                </Button>
                <Button
                  variant="secondary"
                  icon={Plus}
                  onClick={() => setActiveModal("interview")}
                >
                  Interview Prep
                </Button>
              </div>
            </div>

            <RecentActivity activity={data.recentActivity} />
          </div>
        )}
      </div>

      <Modal open={activeModal === "task"} onClose={closeModal} title="Add Task">
        <TaskForm
          onSubmit={(payload) => handleQuickAdd("task", payload)}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>

      <Modal open={activeModal === "dsa"} onClose={closeModal} title="Add DSA Problem" size="lg">
        <DSAForm
          onSubmit={(payload) => handleQuickAdd("dsa", payload)}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>

      <Modal open={activeModal === "job"} onClose={closeModal} title="Add Job Application" size="lg">
        <JobForm
          onSubmit={(payload) => handleQuickAdd("job", payload)}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>

      <Modal open={activeModal === "interview"} onClose={closeModal} title="Add Interview Preparation" size="lg">
        <InterviewForm
          onSubmit={(payload) => handleQuickAdd("interview", payload)}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>
    </Layout>
  );
};

export default Dashboard;
