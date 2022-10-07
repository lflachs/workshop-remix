import { Link } from "@remix-run/react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variation?: "primary" | "secondary";
  className?: string;
  to?: string;
}

export default function Button({
  children,
  onClick,
  variation,
  className,
  to,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-yellow-400 p-5 font-bold ${className}`}
    >
      {to ? (
        <Link to={to} prefetch="intent">
          {children}
        </Link>
      ) : (
        children
      )}
    </button>
  );
}
