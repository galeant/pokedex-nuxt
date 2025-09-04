type AboutProps = {
  id: number;
  height: number;
  weight: number;
  abilities: string[];
  category: string;
};

// async function getPokemonSpecies(id: number) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
//   return res.json();
// }

const About = ({ id, height, weight, abilities, category }: AboutProps) => {
  // const species = await getPokemonSpecies(id);
  // console.log(
  //   species.genera.find((g: any) => g.language.name === "en")?.genus ?? ""
  // );
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-20 text-gray-600 text-sm">Species</span>
        <span className="font-semibold">{category}</span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="w-20 text-gray-600 text-sm">Height</span>
        <span className="font-semibold">{height} decimeters</span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="w-20 text-gray-600 text-sm">Weight</span>
        <span className="font-semibold">{weight * 0.1} Kg</span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="w-20 text-gray-600 text-sm">Abilities</span>
        <span className="font-semibold">{abilities.join(", ")}</span>
      </div>
    </div>
  );
};

export default About;
