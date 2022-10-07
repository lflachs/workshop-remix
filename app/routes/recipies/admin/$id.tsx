import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";

import invariant from "tiny-invariant";
import {
  createRecipie,
  getRecipie,
  modifyRecipe,
} from "~/models/recipies.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;
  if (!id) {
    throw new Error("id is required");
  }
  return json({
    recipie: await getRecipie(id),
  });
};

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const image = formData.get("image");
  const name = formData.get("name");
  const description = formData.get("description");
  const { id } = params;
  const errors = {
    name: name ? null : "Name is required",
    image: image ? null : "Image is required",
    description: description ? null : "Description is required",
  };

  const hasErrors = Object.values(errors).some(Boolean);
  if (hasErrors) {
    return json(errors);
  }
  invariant(typeof name === "string", `title must be a string`);
  invariant(typeof image === "string", `slug must be a string`);
  invariant(typeof description === "string", `description must be a string`);
  await modifyRecipe({ id, name, image, description });
  return redirect(`/recipies/admin`);
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData<typeof action>();
  const transition = useTransition();
  const isSubmitting = Boolean(transition.submission);
  const { recipie } = useLoaderData<typeof loader>();
  if (!recipie) {
    return <div>loading...</div>;
  }
  return (
    <Form method="post">
      <p>
        <label>
          Recipe Name:{" "}
          {errors?.name ? (
            <em className="text-red-600">{errors.name}</em>
          ) : null}
          <input
            type="text"
            name="name"
            className={inputClassName}
            defaultValue={recipie.name}
          />
        </label>
      </p>
      <p>
        <label>
          Recipe Image:{" "}
          {errors?.image ? (
            <em className="text-red-600">{errors.image}</em>
          ) : null}
          <input
            type="text"
            name="image"
            className={inputClassName}
            defaultValue={recipie.image}
          />
        </label>
      </p>
      <p>
        <label htmlFor="description">
          Description:{" "}
          {errors?.description ? (
            <em className="text-red-600">{errors.description}</em>
          ) : null}
        </label>
        <br />
        <textarea
          id="description"
          rows={8}
          name="description"
          className={`${inputClassName} font-mono`}
          defaultValue={recipie.description}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Modify..." : "Modifying Post"}
        </button>
      </p>
    </Form>
  );
}
