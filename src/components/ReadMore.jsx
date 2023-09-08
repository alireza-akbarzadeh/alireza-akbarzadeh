import { useState } from "react";

export const ReadMore = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <>
      <p className="text-gray-400">
        {isExpanded ? text : text.slice(0, 100)}{" "}
        {text.length > 100 && !isExpanded && (
          <span className="text-secondary">
            ...
            <button onClick={toggleReadMore}>Read More</button>
          </span>
        )}
        {isExpanded && (
          <span className="text-secondary">
            <br />
            <button onClick={toggleReadMore}>Read Less</button>
          </span>
        )}
      </p>
    </>
  );
};
