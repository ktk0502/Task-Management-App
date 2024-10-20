import React from 'react';
import styles from './page.module.css';

interface Task {
    id: number;
    name: string;
}

interface DeleteTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
    onDelete: (taskId: number) => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ isOpen, onClose, task, onDelete }) => {
    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2 style={{color:'black'}}>Delete Task</h2>
                    <p style={{color:'black'}}>
                        Are you sure you want to delete the task: <strong>{task?.name}</strong>?
                    </p>
                    <div className={styles.buttonGroup}>
                        <button style={{color: '#941B0F',border:'1px solid #941B0F',background: 'white',width: '45.5%',height: '3vh'}} className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button>
                        <button style={{background: '#941B0F',color: 'white',width: '45.5%',height:'3vh'}} className={styles.submitButton} type="button" onClick={() => task && onDelete(task.id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteTaskModal;
