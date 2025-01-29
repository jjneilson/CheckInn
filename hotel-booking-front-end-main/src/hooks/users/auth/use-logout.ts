import { useRouter } from "@tanstack/react-router";
import { toast } from "../../use-toast";
import { allHotelReviewsAtom, allReserveAtom, reserveAtom, reviewAtom, userAtom } from "@/store/atoms";
import { useSetAtom } from "jotai";

export function useLogout() {
  const router = useRouter();

  const setUser = useSetAtom(userAtom);
  const setReserve = useSetAtom(reserveAtom);
  const setReview = useSetAtom(reviewAtom);

  const setAllReview = useSetAtom(allHotelReviewsAtom);
  const setAllReserve = useSetAtom(allReserveAtom);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setReserve(null);
    setReview(null);
    
    setAllReview([]);
    setAllReserve([]);

    toast({
      title: "Logged out successfully",
    });
    router.navigate({ to: "/" });
  };

  return logout;
}
