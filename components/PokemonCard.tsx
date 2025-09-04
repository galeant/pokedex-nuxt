import Image from "next/image";
import TabMenu from "./TabMenu";

type PokemonCardProps = {
  id: number;
  name: string;
  types: string[];
  image: string;
  stats: {
    name: string;
    base_stat: number;
  }[];
  height: number;
  weight: number;
  abilities: string[];
  // // moves: { name: string; url: string }[];
  category: string;
};

const typeColors: Record<string, string> = {
  normal: "bg-[#a8a77a]",
  fighting: "bg-[#c22e28]",
  flying: "bg-[#a98ff3]",
  poison: "bg-[#a33ea1]",
  ground: "bg-[#e2bf65]",
  rock: "bg-[#b6a136]",
  bug: "bg-[#a6b91a]",
  ghost: "bg-[#735797]",
  steel: "bg-[#b7b7ce]",
  fire: "bg-[#ee8130]",
  water: "bg-[#6390f0]",
  grass: "bg-[#7ac74c]",
  electric: "bg-[#f7d02c]",
  psychic: "bg-[#f95587]",
  ice: "bg-[#96d9d6]",
  dragon: "bg-[#6f35fc]",
  dark: "bg-[#705746]",
  fairy: "bg-[#d685ad]",
  stellar: "bg-[#8ed2ff]",
  unknown: "bg-[#8ed2ff]",
  shadow: "bg-[#8ed2ff]",
};

export default function PokemonCard({
  id,
  name,
  types,
  image,
  stats,
  height,
  weight,
  abilities,
  category,
}: PokemonCardProps) {
  return (
    <div
      className={`relative rounded-2xl shadow-lg ${
        typeColors[types[0]] ?? "bg-gray-400"
      }`}
    >
      <div className="p-2">
        <span className="absolute top-3 right-4 text-white/60 font-bold text-sm">
          #{id.toString().padStart(3, "0")}
        </span>

        <h2 className="text-white font-bold text-xl capitalize">{name}</h2>

        <div className="flex gap-2 mt-2">
          {types.map((t) => {
            const typeColor = typeColors[t];
            return (
              <span
                key={t}
                className={`px-3 py-1 rounded-full text-white text-sm font-semibold capitalize ${typeColor}`}
              >
                {t}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-3">
        <Image
          src={image}
          alt={name}
          width={120}
          height={120}
          className="drop-shadow-md"
        />
      </div>
      <TabMenu
        stats={stats}
        height={height}
        weight={weight}
        id={id}
        abilities={abilities}
        category={category}
      ></TabMenu>
    </div>
  );
}
