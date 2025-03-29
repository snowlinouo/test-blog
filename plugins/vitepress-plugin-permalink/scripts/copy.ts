import { copy } from "fs-extra";
import { glob } from "tinyglobby";

const toDest = (file: string) => {
  return file.replace(/^src\//, "dist/");
};

const file = await glob(["src/components/**"]);

file.forEach(file => {
  if (!/\.vue$/.test(file)) return;

  copy(file, toDest(file));
});
