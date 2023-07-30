import React, { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((item, index) => {
          return (
            <span
              key={index}
              className={`tabItem ${index === selectedTab ? "active" : ""}`}
              onClick={() => activeTab(item, index)}
            >
              {item}
            </span>
          );
        })}
        <span className="movingBg" style={{ left: left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
