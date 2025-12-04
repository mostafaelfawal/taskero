import { useState } from "react";

export default function ToggleButton({ onClick }: { onClick: () => void }) {
  const [isOn, setIsOn] = useState(false);
  
  const toggle = () => {
    onClick();
    setIsOn(!isOn);
  };
  return (
    <div
      onClick={toggle}
      className={`w-10 h-5 rounded-full cursor-pointer transition-colors flex items-center px-1
        ${isOn ? "bg-violet-500" : "bg-gray-300"}
      `}
    >
      <span
        className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform
        ${isOn ? "translate-x-4" : "translate-x-0"}
      `}
      ></span>
    </div>
  );
}
