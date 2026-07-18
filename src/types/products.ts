export interface Product {
  id: number;
  name: string;
  slug: string;

  category:
    | "Brackets"
    | "Junction Boxes"
    | "Counterweight"
    | "Machine Parts"
    | "Others";

  image: string;

  description: string;

  material: string;

  featured?: boolean;
}