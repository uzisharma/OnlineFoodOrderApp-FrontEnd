import { GoBackButton } from "./Input";

export default function Header({ heading, backBtn = true }) {
  return (
    <header>
      <h1>{heading}</h1>
      {backBtn && <GoBackButton />}
    </header>
  );
}
