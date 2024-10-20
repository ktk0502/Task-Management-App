"use client";

import { useState } from "react";
import TaskTable from "@/components/Tasktable/TaskTable";
import SearchBar from "@/components/SearchBar/SearchBar";
import AddTaskModal from "@/components/AddTaskModal/AddTaskModal";
import FilterControls from "@/components/FilterControls/FilterControls";
import SortControls from "@/components/SortControls/SortControls";
import { TaskProvider } from "../context/TaskContext";
import styles from './page.module.css';

const Home = () => {
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);

  const handleSearch = (searchTerm: string) => {
    // Implement search logic
    console.log("Search term:", searchTerm);
  };

  const handleSort = (order: "asc" | "desc") => {
    // Implement sort logic
    console.log("Sorting by:", order);
  };

  const handleFilter = (filter: { priority: string; status: string }) => {
    // Implement filter logic
    console.log("Filtering by:", filter);
  };

  return (
    <TaskProvider>
      <div className={styles.fullcontainer}>
        <div className={styles.navbar}>
          <h1 className={styles.iconimage}>Studio137</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className={styles.controls}>
          <h1 className={styles.tableheading}>Tasks</h1>
          <div className={styles.controlsleft}>
            <button className={styles.addtask} onClick={() => setAddTaskModalOpen(true)}>+ Add Task</button>
            {isAddTaskModalOpen && <AddTaskModal onClose={() => setAddTaskModalOpen(false)} />}
            <SortControls onSort={handleSort} />
            <FilterControls onFilter={handleFilter} />
          </div>
        </div>
        <div className={styles.tasktable}>
           <TaskTable />
        </div>
      </div>
    </TaskProvider>
  );
};

export default Home;
