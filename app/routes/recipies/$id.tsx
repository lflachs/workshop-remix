import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getRecipie } from "~/models/recipies.server";

export async function loader({ params }: LoaderArgs) {
  const { id } = params;
  if (!id) throw new Error("This should be impossible");
  const recipie = await getRecipie(id);
  if (!id) {
    throw new Error("Post not found");
  }
  return json({ recipie });
}

export default function RecipiePage() {
  const { recipie } = useLoaderData<typeof loader>();

  return (
    <main className="p-10">
      <img
        src={recipie?.image}
        alt={recipie?.description}
        className="rounded"
      />
      <h2 className="text-xl font-extrabold">{recipie?.name}</h2>

      <h3 className="text-l font-bold">Description:</h3>
      <h3 className="text-l font-bold">Ingredient:</h3>
      <Outlet />
    </main>
  );
}
