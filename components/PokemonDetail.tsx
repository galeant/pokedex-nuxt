// import { pokemonTypeColors } from "./pokemonTypeColors";
// import { useState } from "react";

function PokemonDetail() {
  return <h1>Test</h1>;
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About" },
    { id: "stats", label: "Base Stats" },
    { id: "evolution", label: "Evolution" },
    { id: "moves", label: "Moves" },
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-emerald-400 to-emerald-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{pokemon.name}</h2>
          <span className="text-sm font-semibold">#{pokemon.id}</span>
        </div>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((t) => (
            <span
              key={t}
              className={`${pokemonTypeColors[t]} text-white px-3 py-1 rounded-full text-xs font-medium`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Pokemon Image */}
      <div className="flex justify-center -mt-6">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-40 h-40 drop-shadow-lg"
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b text-gray-500 text-sm font-medium mt-2">
        <button className="py-2 border-b-2 border-emerald-500 text-emerald-600">
          About
        </button>
        <button className="py-2">Base Stats</button>
        <button className="py-2">Evolution</button>
        <button className="py-2">Moves</button>
      </div>

      {/* Details */}
      <div className="p-4 text-sm text-gray-700">
        <div className="flex justify-between py-1">
          <span className="font-medium">Species</span>
          <span>{pokemon.species}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium">Height</span>
          <span>{pokemon.height}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium">Weight</span>
          <span>{pokemon.weight}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium">Abilities</span>
          <span>{pokemon.abilities.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
