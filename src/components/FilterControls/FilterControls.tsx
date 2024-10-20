import { useState } from "react";
import styles from "./page.module.css";

type FilterControlsProps = {
  onFilter: (filter: { priority: string; status: string }) => void;
};

const FilterControls = ({ onFilter }: FilterControlsProps) => {
  const [filter, setFilter] = useState({ priority: "", status: "" });
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = { ...filter, [e.target.name]: e.target.value };
    setFilter(newFilter);
    onFilter(newFilter); // Trigger filter action
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={styles.sortbtndown}>
      {/* Filter dropdown */}
      <select
        className={`${styles.filer} ${isDropdownVisible ? styles.showDropdown : ""}`}
        name="status"
        value={filter.status}
        onChange={handleFilterChange}
      >
        <option value="">Filter</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Hamburger icon for mobile view */}
      <div className={styles.hamburger} onClick={toggleDropdown}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default FilterControls;
