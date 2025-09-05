"use client";

import { useState } from "react";
import BaseStats from "./BaseStats";
import About from "./About";
import Evolution from "./Evolution";

type TabMenuProps = {
  stats: {
    name: string;
    base_stat: number;
  }[];
  id: number;
  height: number;
  weight: number;
  abilities: string[];
  category: string;
  evoChain: string;
};

function TabMenu({
  stats,
  height,
  weight,
  abilities,
  id,
  category,
  evoChain,
}: TabMenuProps) {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About" },
    { id: "stats", label: "Base Stats" },
    { id: "evolution", label: "Evolution" },
    { id: "moves", label: "Moves" },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg">
      <div className="flex justify-around text-sm font-semibold ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 transition-colors border-b ${
              activeTab === tab.id ? "text-black" : "text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 text-gray-700 text-sm">
        {activeTab === "about" && (
          <About
            height={height}
            weight={weight}
            id={id}
            abilities={abilities}
            category={category}
          ></About>
        )}
        {activeTab === "stats" && <BaseStats stats={stats}></BaseStats>}
        {activeTab === "evolution" && (
          <Evolution evoChain={evoChain}></Evolution>
        )}
        {activeTab === "moves" && <div>Moves Content</div>}
      </div>
    </div>
  );
}

export default TabMenu;
