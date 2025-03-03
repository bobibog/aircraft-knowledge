import React, { useState, useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";

const DropdownFilterSelector = ({
  selectedItem,
  fetchOptions, // Function to fetch filtered objects (async, receives search query)
  renderOption, // Function to render a single option (receives an object)
  onOptionSelect, // Callback when an option is selected (receives selected object)
  placeholder = "Type to search...", // Placeholder for input
  debounceTime = 500, // Debounce time for fetch
}) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setSelectedOption(selectedItem);
    if (selectedItem) {
      setQuery(renderOption(selectedItem));
    }    
  }, []);

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownVisible(false); // Close dropdown if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced fetch function (memoized with useCallback to persist between renders)
  const fetchDebouncedOptions = useCallback(
    debounce(async (searchQuery) => {
      // if (!searchQuery.trim()) {
      //   setOptions([]);
      //   return;
      // }
      try {
        const result = await fetchOptions(searchQuery);
        setOptions(result);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }, debounceTime),
    [fetchOptions, debounceTime]
  );
  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsDropdownVisible(true);
    fetchDebouncedOptions(value);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setQuery(renderOption(option));
    setIsDropdownVisible(false);
    onOptionSelect(option);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        value={selectedOption ? query : query}
        onChange={handleInputChange}
        onFocus={(e) => {
          //setIsDropdownVisible(true);
          e.target.select(); // Select all text on focus
          handleInputChange(e);
        }}
        placeholder={placeholder}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />
      {isDropdownVisible && options.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                borderBottom: "1px solid #eee",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#ececec")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#f9f9f9")
              }
            >
              {renderOption(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilterSelector;