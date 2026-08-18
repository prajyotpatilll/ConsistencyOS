import { ListChecks } from "lucide-react";
import TaskCard from "./TaskCard.jsx";
import EmptyState from "../common/EmptyState.jsx";

const TaskList = ({ tasks, onToggle, onEdit, onDelete, onAdd }) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title="No tasks yet"
        description="Add your first task to start tracking today's progress."
        actionLabel="Add your first task"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
