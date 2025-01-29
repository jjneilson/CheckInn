import RegisterForm from "@/components/Forms/register-form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}
