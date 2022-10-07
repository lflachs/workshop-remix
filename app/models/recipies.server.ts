import type { Recipie } from "@prisma/client";
import { prisma } from "~/db.server";

export function getRecipies(search = "") {
  return prisma.recipie.findMany({where: {name: {contains: search}}});
}

export function getRecipie(id: Recipie["id"]) {
  return prisma.recipie.findUnique({ where: { id } });
}

export function createRecipie({name, image, description}: Pick<Recipie, "name" | "description" | "image">) {
  return prisma.recipie.create({
    data: {
      name,
      description,
      image,
    },
  });
}

export function deleteRecipe(id: Recipie["id"]) {
  return prisma.recipie.delete({
    where: {id}
  });
}

export function modifyRecipe({id, name, image, description}: Recipie) {
  return prisma.recipie.update({
    where: {id},
    data: {
      name,
      description,
      image,
    },
  });
}
