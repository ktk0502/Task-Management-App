import { useContext, useState, useEffect } from "react";
import { Task, TaskContext } from "@/context/TaskContext";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import styles from './page.module.css';
import React from "react";

const TaskTable = () => {
  const taskContext = useContext(TaskContext);
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false); // State for delete modal
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null); // State to hold task to delete

  useEffect(() => {
    const checkMobileView = () => {
      if (typeof window !== "undefined") {
        setIsMobileView(window.innerWidth < 900);
      }
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const handleSaveTask = (updatedTask: Task) => {
    if (taskContext && taskContext.editTask) {
      taskContext.editTask(updatedTask);
    }
    setIsEditModalOpen(false);
    setCurrentTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    if (taskContext && taskContext.deleteTask) {
      taskContext.deleteTask(taskId); // Call deleteTask with taskId
    }
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  if (!taskContext || !taskContext.tasks || taskContext.tasks.length === 0) {
    return (
      <div>
        <table className={styles.tasktable}>
          <thead>
            <tr className={styles.tasktablehead}>
              <th style={{ width: "7vw" }}>SL.No</th>
              <th style={{ width: "15vw" }}>Title</th>
              <th style={{ width: "30vw" }}>Description</th>
              <th>Due Date</th>
              {isMobileView && <th>Status</th>}
              <th>Progress</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }

  const { tasks } = taskContext;

  const toggleRow = (id: string | number) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id);
      } else {
        newExpandedRows.add(id);
      }
      return newExpandedRows;
    });
  };

  return (
    <>
      <table className={styles.tasktable}>
        <thead>
          <tr className={styles.tasktablehead}>
            <th style={{ width: "6vw" }}>SL.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            {isMobileView && <th>Status</th>}
            <th>Progress</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              {isMobileView && !expandedRows.has(task.id) && (
                <tr className={styles.expandedRow} style={{ cursor: 'pointer' }} onClick={() => toggleRow(task.id)}>
                  <td colSpan={isMobileView ? 6 : 5}>
                    <div className={styles.details}>
                      <span style={{ marginLeft: '95%' }}>▼ </span>
                      <p><strong style={{ marginRight: '15%' }}>Title:</strong> {task.name}</p>
                      <p><strong style={{ marginRight: '7%' }}>Description:</strong> {task.description}</p>
                      <p><strong style={{ marginRight: '10%'}}>Due Date:</strong> {task.dueDate}</p>
                    </div>
                  </td>
                </tr>
              )}
              {isMobileView && expandedRows.has(task.id) && (
                <tr onClick={() => toggleRow(task.id)} style={{ cursor: 'pointer' }}>
                  <span style={{ marginLeft: '95%', color: 'black' }}>▲</span>
                  <td data-label="SL.No">{index + 1}</td>
                  <td data-label="Title">{task.name}</td>
                  <td data-label="Description" style={{ display: 'flex', width: '100%' }} className={styles.description}>{task.description}</td>
                  <td data-label="Due Date">{task.dueDate}</td>
                  <td data-label="Status" style={{ display: 'flex' }}>
                    <div className={
                      task.status === "Completed" ? styles.completed :
                      task.status === "In Progress" ? styles.inprogress :
                      styles.incomplete
                    }>
                      {task.status}
                    </div>
                  </td>
                  <td data-label="Priority">{task.priority}</td>
                  <td data-label="Actions">
                    <button onClick={() => { setCurrentTask(task); setIsEditModalOpen(true); }}>Edit</button>
                    <button onClick={() => { setTaskToDelete(task); setIsDeleteModalOpen(true); }}>Delete</button>
                  </td>
                </tr>
              )}

              {!isMobileView && (
                <tr>
                  <td data-label="SL.No">{index + 1}</td>
                  <td data-label="Title">{task.name}</td>
                  <td data-label="Description" className={styles.description}>{task.description}</td>
                  <td data-label="Due Date">{task.dueDate}</td>
                  <td data-label="Status" style={{ display: 'flex', marginTop: '6%' }}>
                    <div className={
                      task.status === "Completed" ? styles.completed :
                      task.status === "In Progress" ? styles.inprogress :
                      styles.incomplete
                    }>
                      {task.status}
                    </div>
                  </td>
                  <td data-label="Priority">{task.priority}</td>
                  <td data-label="Actions">
                    <button onClick={() => { setCurrentTask(task); setIsEditModalOpen(true); }}>Edit</button>
                    <button onClick={() => { setTaskToDelete(task); setIsDeleteModalOpen(true); }}>Delete</button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={currentTask}
        onSave={handleSaveTask}
      />

      {/* Delete Task Modal */}
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        task={taskToDelete}
        onDelete={handleDeleteTask}
      />
    </>
  );
};

export default TaskTable;
