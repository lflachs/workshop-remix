import { Link } from "@remix-run/react";

interface ConditionalLinkProps {
  to?: string;
  children: React.ReactNode;
}
export default function ConditionalLink({
  to,
  children,
}: ConditionalLinkProps) {
  return to ? (
    <Link to={to} prefetch="intent">
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
}
