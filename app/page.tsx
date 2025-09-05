"use client";

import PokemonCard from "@/components/PokemonCard";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import pokedexLogo from "./Pokédex_logo.png";

type Pokemon = {
  id: number;
  name: string;
  url: string;
  types: string[];
  image: string;
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

export default function Page() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    setLoading(true);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
    );
    const data = await res.json();

    const detailPromises = data.results.map(async (p: any) => {
      const pokemonRes = await fetch(p.url);
      const pokemon = await pokemonRes.json();

      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((t: any) => t.type.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        moves: pokemon.moves,
      } as Pokemon;
    });

    const newPokemons = await Promise.all(detailPromises);

    setPokemons([...pokemons, ...newPokemons]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const loadMore = () => {
    setOffset(offset + 20);
  };

  return (
    <div className="container mx-auto px-4 pt-2">
      <div className="flex justify-center items-center p-6">
        <Image
          src="/Pokédex_logo.png"
          alt="Bulbasaur"
          width={300} // biar nggak fixed
          height={100} // biar nggak fixed
          className="h-auto w-auto max-w-full"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6">
        {pokemons.map((pokemon) => {
          return (
            <Link
              key={pokemon.name}
              href={`${pokemon.name}`}
              className="hover:opacity-75"
            >
              <PokemonCard
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
              />
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center mb-6">
        <button
          onClick={loadMore}
          className="px-4 py-2 bg-[#6390f0] text-white rounded hover:bg-[#34609c] disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
