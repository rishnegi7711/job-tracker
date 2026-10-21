// PROTOTYPE (throwaway): "What should the login page look like?"
// Three directions on /prototype/login, switch with ?variant=A|B|C or the bottom bar.
// Submit is stubbed (no API, no auth): password "wrong" -> error, anything else -> success.
import "@fontsource-variable/geist";
import "./login-prototype.css";
import { useSearchParams } from "react-router-dom";
import PrototypeSwitcher from "@/components/PrototypeSwitcher";
import LoginVariantA from "./LoginVariantA";
import LoginVariantB from "./LoginVariantB";
import LoginVariantC from "./LoginVariantC";

const variants = [
  { key: "A", name: "Paper (Notion-like)", Component: LoginVariantA },
  { key: "B", name: "Command (dark)", Component: LoginVariantB },
  { key: "C", name: "Ledger (editorial)", Component: LoginVariantC },
];

export default function LoginPrototype() {
  const [params] = useSearchParams();
  const v = variants.find((x) => x.key === params.get("variant")) ?? variants[0];
  return (
    <>
      <v.Component />
      <PrototypeSwitcher variants={variants} current={v.key} />
    </>
  );
}
