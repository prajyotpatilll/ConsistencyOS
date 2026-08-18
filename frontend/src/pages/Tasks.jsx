import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Layout from "../components/layout/Layout.jsx";
import Header from "../components/layout/Header.jsx";
import Loading from "../components/common/Loading.jsx";
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import TaskForm from "../components/tasks/TaskForm.jsx";
import TaskList from "../components/tasks/TaskList.jsx";
import { useToast } from "../hooks/useToast";
import taskService from "../services/task.service";

const filters = [
  { key: "all", label: "All" },
  { key: "today", label: "Today" },
  { key: "completed", label: "Completed" },
  { key: "pending", label: "Pending" },
];

const isToday = (date) => {
  if (!date) return false;
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

const Tasks = () => {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await taskService.getTasks();
      setTasks(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = tasks.filter((task) => {
    const isDone = task.completedToday ?? task.completed;
    // A recurring task counts as "today" every day; a one-time task
    // only counts when its dueDate is today.
    if (filter === "today") return task.isRecurring || isToday(task.dueDate);
    if (filter === "completed") return isDone;
    if (filter === "pending") return !isDone;
    return true;
  });

  const openAddModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, payload);
        showToast("Task updated");
      } else {
        await taskService.createTask(payload);
        showToast("Task added");
      }
      closeModal();
      loadTasks();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (task) => {
    const isDone = task.completedToday ?? task.completed;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id
          ? { ...t, completedToday: !isDone, completed: !isDone }
          : t
      )
    );
    try {
      await taskService.completeTask(task._id, !isDone);
    } catch (err) {
      showToast(err.message, "error");
      loadTasks();
    }
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await taskService.deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      showToast("Task deleted");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Layout>
      <Header title="My Tasks" subtitle="Custom daily tasks you're tracking" />

      <div className="mx-auto max-w-3xl px-5 py-6 md:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-xl bg-canvas p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.key
                    ? "bg-surface text-ink shadow-card"
                    : "text-muted hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <Button icon={Plus} onClick={openAddModal}>
            Add Task
          </Button>
        </div>

        {loading && <Loading label="Loading your tasks..." />}

        {!loading && error && (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
            <p className="text-sm text-muted">Unable to load your tasks.</p>
            <Button className="mt-4" onClick={loadTasks}>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onAdd={openAddModal}
          />
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingTask ? "Edit Task" : "Add Task"}
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>
    </Layout>
  );
};

export default Tasks;
