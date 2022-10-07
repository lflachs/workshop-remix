import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import Nav from "~/components/Nav";
import { getRecipies } from "~/models/recipies.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const recipies = await getRecipies(search);
  return json({ recipies });
};

export default function Index() {
  const { recipies } = useLoaderData<typeof loader>();
  const [search, setSearch] = useState("");
  const onSearch = (string: string) => {
    setSearch(string);
  };

  return (
    <main className="relative min-h-screen bg-white">
      <Nav onSearch={onSearch} />
      <Outlet />
      <div className="flex flex-wrap justify-center gap-5 p-5">
        {recipies
          .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
          .map((recipe) => (
            <Card
              key={recipe.id}
              image={recipe.image}
              title={recipe.name}
              to={`recipies/${recipe.id}`}
            />
          ))}
      </div>
      <footer className="fixed bottom-0 flex w-full justify-center p-4">
        <Button to="/recipies/admin">+ Add recipe</Button>
      </footer>
    </main>
  );
}
