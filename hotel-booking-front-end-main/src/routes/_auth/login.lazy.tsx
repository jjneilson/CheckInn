import LoginForm from "@/components/Forms/LoginForm";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
