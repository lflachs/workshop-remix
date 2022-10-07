import { Form, Link, useLoaderData } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import Button from "~/components/Button";
import Card from "~/components/Card";
import { deleteRecipe, getRecipies } from "~/models/recipies.server";

export const loader = async () => {
  return json({
    recipies: await getRecipies(),
  });
};

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();

  const intent = formData.get("intent");
  console.log(formData);
  if (intent === "delete") {
    const id = formData.get("id");
    await deleteRecipe(id);
    return redirect("/recipies/admin");
  }
}

export default function AdminIndex() {
  const { recipies } = useLoaderData<typeof loader>();

  return (
    <p>
      <ul>
        {recipies.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              backgroundImage: `url(${recipe.image}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
              backgroundBlendMode: "overlay",
            }}
            className="m-5 flex h-20 items-center justify-between rounded bg-cover bg-center p-5 text-white"
          >
            <Link to={`recipies/${recipe.id}`}>{recipe.name}</Link>
            <div>
              <Form method="delete">
                <input type="hidden" name="id" value={recipe.id} />
                <button className="p-2" name="intent" value="delete">
                  🗑️
                </button>
              </Form>
              <Link to={`${recipe.id}`}>
                <button className="p-2" type="submit">
                  ✏️
                </button>
              </Link>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex w-full justify-center">
        <Button to="new">Create a New recipe</Button>
      </div>
    </p>
  );
}
