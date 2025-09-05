"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";
import NotFound from "./NotFound";

type MoveProps = {
  moves?: { name: string; url: string }[];
};

export default function Moves({ moves = [] }: MoveProps) {
  const [moveList, setMoveList] = useState<any>([]);

  useEffect(() => {
    async function getAllMoves() {
      try {
        const moveListDetail = await Promise.all(
          moves.map(async (m: any) => {
            const name = m.move.name
              .split("-") // pisah kata berdasarkan "-"
              .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)) // kapital tiap kata
              .join(" ");
            const moveRes = await fetch(m.move.url);
            const move = await moveRes.json();
            return {
              name: name,
              pp: move.pp,
              power: move.power,
              type: move.damage_class.name,
            };
          })
        );
        setMoveList(moveListDetail);
      } catch (err) {
        console.error(err);
      }
    }
    getAllMoves();
  }, [moves]);

  return (
    <div className="container mx-auto px-4">
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-black px-2">Name</th>
            <th className="border border-black px-2">Power</th>
            <th className="border border-black px-2">PP</th>
            <th className="border border-black px-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {moveList.map((m: any, i: number) => (
            <tr key={i}>
              <td className="border border-black px-2">{m.name}</td>
              <td className="border border-black px-2">{m.power}</td>
              <td className="border border-black px-2">{m.pp}</td>
              <td className="border border-black px-2">{m.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
