import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

export const Dropdown = ({ children, className, logo, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
}

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-47" ref={dropdownRef}>
      <Button onClick={handleToggle} logo={logo} />
      {isOpen && (
      <div className={`absolute bg-white mb-4 ${type == 'up' ? 'bottom-full' : ''} shadow-md gap-4 w-[100px] p-3 flex flex-col text-left ${className} `}>
          {children}
        </div>
      )}
    </div>
  );
};
