import Image from "next/image";
import TabMenu from "./TabMenu";

type PokemonCardProps = {
  id: number;
  name: string;
  types: string[];
  image: string;
  stats?: {
    name: string;
    base_stat: number;
  }[];
  height?: number;
  weight?: number;
  abilities?: string[];
  category?: string;
  evoChain?: string;
  moves?: { name: string; url: string }[];
  showDetail?: boolean;
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

const colorType: Record<string, string> = {
  normal: "bg-[#a8a77a]/70",
  fighting: "bg-[#c22e28]/70",
  flying: "bg-[#a98ff3]/70",
  poison: "bg-[#a33ea1]/70",
  ground: "bg-[#e2bf65]/70",
  rock: "bg-[#b6a136]/70",
  bug: "bg-[#a6b91a]/70",
  ghost: "bg-[#735797]/70",
  steel: "bg-[#b7b7ce]/70",
  fire: "bg-[#ee8130]/70",
  water: "bg-[#6390f0]/70",
  grass: "bg-[#7ac74c]/70",
  electric: "bg-[#f7d02c]/70",
  psychic: "bg-[#f95587]/70",
  ice: "bg-[#96d9d6]/70",
  dragon: "bg-[#6f35fc]/70",
  dark: "bg-[#705746]/70",
  fairy: "bg-[#d685ad]/70",
  stellar: "bg-[#8ed2ff]/70",
  unknown: "bg-[#8ed2ff]/70",
  shadow: "bg-[#8ed2ff]/70",
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
  evoChain,
  moves,
  showDetail = false,
}: PokemonCardProps) {
  return (
    <div
      className={`relative rounded-2xl shadow-lg p-3 bg-no-repeat bg-center  ${
        typeColors[types[0]] ?? "bg-gray-400"
      }`}
      style={{
        backgroundImage: "url('/bg-poke-gry.png')",
        backgroundSize: "50%",
        backgroundPosition: showDetail ? "center top" : "center center",
      }}
    >
      <div className="flex flex-row justify-between ">
        <h2 className="text-white font-bold text-xl capitalize">{name}</h2>
        <span className="text-white/60 font-bold text-sm">#{id}</span>
      </div>

      <div className="flex flex-row justify-between ">
        <div className="flex flex-col gap-1">
          {types.map((t) => {
            const typeColor = colorType[t];
            return (
              <span
                key={t}
                className={`p-1 text-white text-sm font-semibold uppercase text-center rounded-md bg-[#a3a3a3]/50`}
              >
                {t}
              </span>
            );
          })}
        </div>

        <Image
          src={image}
          alt={name}
          width={120}
          height={120}
          className="drop-shadow-md"
        />
      </div>

      {showDetail && (
        <TabMenu
          stats={stats}
          height={height}
          weight={weight}
          id={id}
          abilities={abilities}
          category={category}
          evoChain={evoChain}
          moves={moves}
        ></TabMenu>
      )}
    </div>
  );
}
