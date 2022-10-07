import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import type { ActionArgs } from "@remix-run/server-runtime";
import Logo from "../assets/Logo.svg";
import { useState } from "react";

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
    <nav className="items-between flex ">
      <div className="flex w-full items-center justify-around p-4">
        <Link to="/">
          <img src={Logo} alt="logo recipies" />
        </Link>
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
    </nav>
  );
}
