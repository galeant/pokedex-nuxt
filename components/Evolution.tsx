"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type EvolutionProps = {
  evoChain: string;
};

type EvolutionChainNode = {
  species: { name: string; url: string };
  evolves_to: EvolutionChainNode[];
};

function parseEvolutionChain(node: EvolutionChainNode): any[] {
  // ambil data saat ini

  const url = node.species.url;
  const parts = url.split("/");
  const id = parts[parts.length - 2];
  const current = {
    name: node.species.name,
    id: id,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  };

  if (node.evolves_to.length > 0) {
    return [
      current,
      ...node.evolves_to.flatMap((child) => parseEvolutionChain(child)),
    ];
  }

  return [current];
}

async function getEvolutions(evoChain: string) {
  const res = await fetch(evoChain);
  return res.json();
}

const Evolution = ({ evoChain }: EvolutionProps) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEvolutions() {
      try {
        const res = await fetch(evoChain);
        const json = await res.json();
        const evolutionArray = parseEvolutionChain(json.chain);
        console.log(evolutionArray);
        setData(evolutionArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    const a = getEvolutions();
    // console.log(a);
  }, [evoChain]);

  // if (loading) return <div>Loading evolutions...</div>;
  // if (!data) return <div>No data</div>;

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      {data.map((d, index) => {
        return (
          <div className="flex flex-col items-center text-black">
            <Image
              src={d.image}
              alt="no image"
              width={50}
              height={50}
              className="drop-shadow-md"
            />

            <div className="text-lg font-semibold">{d.name}</div>
            <div className="text-sm"> #{d.id.toString().padStart(3, "0")}</div>
            {index !== data.length - 1 && (
              <div className="text-black text-2xl">↓</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Evolution;
