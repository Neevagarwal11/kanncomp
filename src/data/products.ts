import type { Product } from "../types/products";

import JunctionBox from "../assets/JunctionBox.png";
import Bracket from "../assets/Brackets.jpg";
import CounterWeight from "../assets/counterWeights.jpeg";
import GuideBracket from "../assets/Brackets.jpg";
import CabinFrame from "../assets/Brackets.jpg";

export const categories = [
  "All",
  "Brackets",
  "Junction Boxes",
  "Counterweight",
  "Cabin Components",
  "Machine Parts",
  "Others",
] as const;

export type Category = (typeof categories)[number];
export const products: Product[] = [
  {
    id: 1,
    slug: "junction-box",
    name: "Junction Box",
    category: "Junction Boxes",
    image: JunctionBox,
    material: "Galvanized Steel",
    description:
      "Precision fabricated elevator junction box with corrosion resistant finish.",
    featured: true,
  },

  {
    id: 2,
    slug: "guide-bracket",
    name: "Guide Rail Bracket",
    category: "Brackets",
    image: GuideBracket,
    material: "MS IS2062",
    description:
      "Laser cut guide rail bracket manufactured with high dimensional accuracy.",
  },

  {
    id: 3,
    slug: "counterweight-frame",
    name: "Counterweight Frame",
    category: "Counterweight",
    image: CounterWeight,
    material: "MS Steel",
    description:
      "Heavy duty counterweight frame engineered for high load capacity.",
  },

  {
    id: 4,
    slug: "cabin-frame",
    name: "Cabin Frame",
    category: "Cabin Components",
    image: CabinFrame,
    material: "Structural Steel",
    description:
      "Robust cabin frame fabricated using precision welding techniques.",
  },

  {
    id: 5,
    slug: "lift-bracket",
    name: "Lift Support Bracket",
    category: "Brackets",
    image: Bracket,
    material: "MS Steel",
    description:
      "Custom fabricated support bracket with CNC bending and laser cutting.",
  },
];