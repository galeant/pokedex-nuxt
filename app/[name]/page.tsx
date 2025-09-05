"use client";

import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  stats: {
    name: string;
    base_stat: number;
  }[];
  height: number;
  weight: number;
  abilities: string[];
  moves: { name: string; url: string }[];
  category: string;
  evoChain: string;
};

type Props = { params: Promise<{ name: string }> };

export default function PokemonDetail({ params }: Props) {
  const { name } = React.use(params);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    async function fetchPokemon() {
      const pokemonRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokemonJson = await pokemonRes.json();

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`
      );
      const species = await speciesRes.json();

      const formatted: Pokemon = {
        id: pokemonJson.id,
        name: pokemonJson.name,
        height: pokemonJson.height,
        weight: pokemonJson.weight,
        types: pokemonJson.types.map((t: any) => t.type.name),
        abilities: pokemonJson.abilities.map((a: any) => a.ability.name),
        stats: pokemonJson.stats.map((s: any) => ({
          name: s.stat.name,
          base_stat: s.base_stat,
        })),
        category:
          species.genera.find((g: any) => g.language.name === "en")?.genus ??
          "",
        evoChain: species.evolution_chain.url,
        moves: pokemonJson.moves,
      };
      setPokemon(formatted);

      setLoading(false);
    }

    fetchPokemon();
  }, [name]);

  if (loading) return <Loading />;
  if (!pokemon) return <NotFound />;

  return (
    <div className="mx-auto w-full max-w-lg px-4 mt-5">
      <Link
        href="/"
        className="text-center w-full inline-block mb-4 px-4 py-2 bg-red-500/60 text-white rounded-lg hover:bg-[#e36e6e] transition"
      >
        Kembali
      </Link>
      <PokemonCard
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        types={pokemon.types}
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        stats={pokemon.stats}
        height={pokemon.height}
        weight={pokemon.weight}
        abilities={pokemon.abilities}
        category={pokemon.category}
        evoChain={pokemon.evoChain}
        moves={pokemon.moves}
        showDetail={true}
      />
    </div>
  );
}
