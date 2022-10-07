import { Outlet } from "@remix-run/react";

export default function AdminIndex() {
  return (
    <>
      <h1>Admin</h1>
      <Outlet />
    </>
  );
}
