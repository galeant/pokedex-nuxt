type AboutProps = {
  id?: number;
  height?: number;
  weight?: number;
  abilities?: string[];
  category?: string;
};

export default function About({
  height,
  weight = 0,
  abilities = [],
  category,
}: AboutProps) {
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
}
