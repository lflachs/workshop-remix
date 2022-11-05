import ConditionalLink from "./ConditionnalLink";

interface CardProps {
  title: string;
  image: string;
  to?: string;
}
export default function Card({ title, image, to }: CardProps) {
  const style = {
    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%), url(${image})`,
  };
  return (
    <div
      style={style}
      className="flex h-60 w-full flex-1 items-end justify-center rounded bg-cover bg-center text-white"
    >
      <ConditionalLink to={to}>
        <p className="p-5 text-center">{title}</p>
      </ConditionalLink>
    </div>
  );
}
