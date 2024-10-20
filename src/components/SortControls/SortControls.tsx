import { useState, useEffect } from "react";
import styles from "./page.module.css";

type SortControlsProps = {
  onSort: (order: "asc" | "desc") => void;
};

const SortControls = ({ onSort }: SortControlsProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    onSort(order); // Trigger sort action
  };

  return (
    <button 
      className={styles.sortbutton}
      onClick={handleSort}
      aria-label={`Sort by date ${sortOrder === "asc" ? "descending" : "ascending"}`}
    >
      {sortOrder === "asc" ? "↑↓" : "↓↑"}
      {/* Only show text when not in mobile view */}
      {!isMobile && " Sort by Date"}
    </button>
  );
};

export default SortControls;
