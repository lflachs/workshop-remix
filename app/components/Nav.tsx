import { Link } from "@remix-run/react";

import Logo from "../assets/Logo.svg";

export default function Nav() {
  return (
    <nav className="items-between flex ">
      <div className="flex w-full items-center justify-between p-4">
        <Link to="/">
          <img src={Logo} alt="logo recipies" />
        </Link>
      </div>
    </nav>
  );
}
