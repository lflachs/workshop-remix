import ErrorImage from "../assets/Error.svg";

interface ErrorComponentProps {
  children: React.ReactNode;
}
export default function ErrorComponent({ children }: ErrorComponentProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div
        style={{ backgroundImage: `url(${ErrorImage})`, paddingTop: "66.64%" }}
        className="h-0 w-full bg-contain bg-center bg-no-repeat"
      ></div>
      {children}
    </div>
  );
}
