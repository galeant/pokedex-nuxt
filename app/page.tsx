import PokemonCard from "@/components/PokemonCard";
import Image from "next/image";

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
  // moves: { name: string; url: string }[];
  category: string;
};

type PokemonResponse = {
  next: string;
  previous: string;
  results: Pokemon[];
};

export async function getPokemonList(): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`, {
    cache: "no-store",
  });
  const data: PokemonResponse = await res.json();

  const detailPromises = data.results.map(async (p) => {
    const pokemonRes = await fetch(p.url);
    const pokemon = await pokemonRes.json();

    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${p.name}`
    );
    const species = await speciesRes.json();

    // const moves = await Promise.all(
    //   pokemon.moves.map(async (m) => {
    //     const res = await fetch(m.move.url);
    //     const data = await res.json();
    //     return data; // data move lengkap
    //   })
    // );

    // console.log(moves);

    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((t: any) => t.type.name),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      stats: pokemon.stats.map((s: any) => ({
        name: s.stat.name,
        base_stat: s.base_stat,
      })),
      abilities: pokemon.abilities.map(
        (a: any) => a.ability.name[0].toUpperCase() + a.ability.name.slice(1)
      ),
      category:
        species.genera.find((g: any) => g.language.name === "en")?.genus ?? "",
      // category: "",
    } as Pokemon;
  });

  return Promise.all(detailPromises);
}

export default async function Page() {
  const pokemons: Pokemon[] = await getPokemonList();
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6">
        {pokemons.map((pokemon) => {
          return (
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
            />
          );
        })}
      </div>
    </div>
  );
}
