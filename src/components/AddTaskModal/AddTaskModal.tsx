import { useState, useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import styles from './page.module.css'
import { display } from "@mui/system";

// Define Task type
type Task = {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Completed";
};

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  // Define task with correct types for priority and status
  const [task, setTask] = useState<Omit<Task, "id">>({
    name: "",
    description: "",
    dueDate: "",
    priority: "Medium", // default value must be one of the allowed literals
    status: "In Progress", // default value must be one of the allowed literals
  });

  const taskContext = useContext(TaskContext);
  if (!taskContext) return null;

  const { addTask } = taskContext;

  const handleSubmit = () => {
    // Add simple validation (e.g., require name and dueDate)
    if (!task.name || !task.dueDate) {
      alert("Please fill out the task name and due date.");
      return;
    }
    
    addTask({
      ...task, id: Date.now(),
      progress: undefined
    });
    onClose(); // Close the modal after adding the task
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.addtaskform} onClick={(e) => e.stopPropagation()}>
        <div className={styles.taskformnavbar}>
          <h2 className={styles.addtaskheading}>Add Task</h2>
          <div className={styles.cross} onClick={onClose}>❌</div>
        </div>
        <div>
          <h5 className={styles.addtaskheading2}>Title</h5>
          <input
            className={styles.titleinput}
            type="text"
            placeholder="Title"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
        </div>
        <div>
        <h5 className={styles.addtaskheading2}>Description</h5>
          <textarea
            className={styles.addtaskdescription}
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <div>
        <h5 className={styles.addtaskheading2}>Choose Due Date</h5>
          <input
            className={styles.taskduedate}
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>
        <div>
        <h5 className={styles.addtaskheading2}>Select Priority</h5>
          <select
            className={styles.addtaskpriority}
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value as "High" | "Medium" | "Low" })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
        <h5 className={styles.addtaskheading2}>Select Status</h5>
          <select
            className={styles.addtaskstatus}
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value as "In Progress" | "Completed" })}
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.submitButton} onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </div>
  );
};


export default AddTaskModal;