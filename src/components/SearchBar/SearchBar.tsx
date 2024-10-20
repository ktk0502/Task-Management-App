import { useState } from "react";
import styles from "./page.module.css";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchbox}>
      <input
        className={styles.inputcontainer}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress} 
      />
    </div>
  );
};

export default SearchBar;
