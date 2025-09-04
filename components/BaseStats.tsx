"use client";

import { useState } from "react";

type BaseStatsProps = {
  stats: {
    name: string;
    base_stat: number;
  }[];
};

type StatBarProps = {
  label: string;
  value: number;
  max?: number;
};

const labels: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defence",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const StatBar = ({ label, value, max = 100 }: StatBarProps) => {
  const color = value < 50 ? "bg-red-400" : "bg-green-500";

  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="w-20 text-gray-600 text-sm">{label}</span>
      <span className="w-8 font-semibold">{value}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded">
        <div
          className={`${color} h-2 rounded`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
};

const BaseStats = ({ stats }: BaseStatsProps) => {
  return (
    <div>
      {stats.map((s) => (
        <StatBar key={s.name} label={labels[s.name]} value={s.base_stat} />
      ))}
    </div>
  );
};

export default BaseStats;
