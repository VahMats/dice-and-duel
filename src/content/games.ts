import { TODO, type Game, type Localized } from "./types";

const descriptionTodo: Localized = {
  ru: "[ТЕКСТ: короткое описание игры]",
  hy: "[ՏԵՔՍՏ: խաղի կարճ նկարագրություն]",
};

/**
 * The game collection. Order here is the display order.
 * Unknown values are marked TODO; fill them in when you have the data.
 */
export const games: Game[] = [
  {
    id: "catan",
    name: "Catan",
    nameRu: undefined, // TODO: Russian name, if different
    players: TODO,
    playTimeMin: TODO,
    age: undefined, // TODO
    types: [], // TODO: e.g. ["strategy", "family"]
    description: descriptionTodo,
    image: undefined, // TODO: "/games/catan.jpg"
    bggUrl: undefined, // TODO: BoardGameGeek link
  },
  {
    id: "bang",
    name: "BANG!",
    nameRu: undefined, // TODO
    players: TODO,
    playTimeMin: TODO,
    age: undefined, // TODO
    types: [], // TODO
    description: descriptionTodo,
    image: undefined, // TODO
    bggUrl: undefined, // TODO
  },
  {
    id: "star-realms",
    name: "Star Realms",
    nameRu: undefined, // TODO
    players: TODO,
    playTimeMin: TODO,
    age: undefined, // TODO
    types: [], // TODO
    description: descriptionTodo,
    image: undefined, // TODO
    bggUrl: undefined, // TODO
  },
  {
    id: "jungo",
    name: "Jungo",
    nameRu: undefined, // TODO
    players: TODO,
    playTimeMin: TODO,
    age: undefined, // TODO
    types: [], // TODO
    description: descriptionTodo,
    image: undefined, // TODO
    bggUrl: undefined, // TODO
  },
  {
    id: "flip-7",
    name: "Flip 7",
    nameRu: undefined, // TODO
    players: TODO,
    playTimeMin: TODO,
    age: undefined, // TODO
    types: [], // TODO
    description: descriptionTodo,
    image: undefined, // TODO
    bggUrl: undefined, // TODO
  },
  {
    id: "skyjo",
    name: "Skyjo",
    nameRu: undefined, // TODO
    players: TODO,
    playTimeMin: TODO,
    age: undefined, // TODO
    types: [], // TODO
    description: descriptionTodo,
    image: undefined, // TODO
    bggUrl: undefined, // TODO
  },
  {
    id: "trio",
    name: "Trio",
    nameRu: undefined, // TODO
    players: TODO,
    playTimeMin: TODO,
    age: undefined, // TODO
    types: [], // TODO
    description: descriptionTodo,
    image: undefined, // TODO
    bggUrl: undefined, // TODO
  },
  {
    id: "spicy",
    name: "Spicy",
    nameRu: undefined, // TODO
    players: TODO,
    playTimeMin: TODO,
    age: undefined, // TODO
    types: [], // TODO
    description: descriptionTodo,
    image: undefined, // TODO
    bggUrl: undefined, // TODO
  },
];
