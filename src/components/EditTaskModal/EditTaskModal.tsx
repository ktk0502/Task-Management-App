import React, { useState, useEffect } from "react";
import { Task } from "@/context/TaskContext"; // Adjust the import path based on your project structure
import styles from './page.module.css'; // Create a CSS file for styling

type EditTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (updatedTask: Task) => void; // Function to save the updated task
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onSave,
}) => {
  const [formData, setFormData] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setFormData(task); // Populate form data when the task is provided
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === "priority" || name === "status" ? value : value, // Set values accordingly
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData); // Call onSave with the updated task
      onClose(); // Close the modal after saving
    }
  };

  if (!isOpen || !formData) return null; // Don't render if not open or no task

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h4 style={{color:'black',marginBottom:'2%'}}>Edit Task</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label style={{color:'black'}} htmlFor="name">Task Name</label>
            <input
            style={{background:'white',color:'black'}}
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label style={{color:'black'}} htmlFor="description">Description</label>
            <textarea

            style={{height:'15vh',background:'white',color:'black'}}
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label style={{color:'black'}} htmlFor="dueDate">Due Date</label>
            <input
            style={{background:'white',color:'black'}}
              type="date"
              name="dueDate"
              id="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label style={{color:'black'}} htmlFor="priority">Priority</label>
            <select
            style={{background:'white',color:'black'}}
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label style={{color:'black'}} htmlFor="status">Status</label>
            <select
            style={{background:'white',color:'black'}}
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.submitButton} type="submit">Save</button>
            <button className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
