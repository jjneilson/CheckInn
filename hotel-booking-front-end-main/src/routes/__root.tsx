import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";


export const Route = createRootRoute({
  component: () => (
    <div className="h-screen grid grid-cols-12 grid-rows-12">
      <Navbar />
      <div className="row-start-2 row-end-12 col-start-2 col-end-12 grid grid-cols-12 grid-rows-12 xs:col-start-1 xs:col-end-13">
        <Outlet />
      </div>
      <div className="bg-[url(/landing-bg.jpg)] bg-no-repeat bg-cover w-full h-full -z-10 row-start-1 row-end-13 col-start-1 col-end-13"></div>
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
