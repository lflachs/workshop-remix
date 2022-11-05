import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import type { ActionArgs } from "@remix-run/server-runtime";
import Logo from "../assets/Logo.svg";

interface NavProps {
  onSearch: (search: string) => void;
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();

  const search = formData.get("search");

  return redirect(`?search=${search}`);
}

export default function Nav({ onSearch }: NavProps) {
  return (
    <div className="flex w-full items-center justify-between p-4">
      <Form method="get">
        <input
          type="text"
          placeholder="🔎 Search recipies"
          className="border-b-4 border-yellow-300"
          name="search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </Form>
    </div>
  );
}
