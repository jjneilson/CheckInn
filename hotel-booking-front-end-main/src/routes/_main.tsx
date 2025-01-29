import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="col-span-full row-span-full grid grid-cols-12 grid-rows-12 p-3">
      <Outlet />
    </div>
  );
}
