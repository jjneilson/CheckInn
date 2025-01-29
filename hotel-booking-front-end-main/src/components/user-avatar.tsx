import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";

interface UserAvatarProps {
  height: number;
  width: number;
  nav: boolean;
}

export function UserAvatar({ height, width, nav }: UserAvatarProps) {
  const [storedUser] = useAtom(userAtom);
  
  if (!storedUser){
    return null;
  }
  
  let fontSize = nav ? "text-sm" : "text-5xl";
  let border = nav ? "border border-2" : "";

  return (
    <Avatar className={`h-[${height}px] w-[${width}px] ${fontSize} ${border}`}>
      <AvatarFallback className="bg-[#022b60a4] text-white">
        {storedUser.firstName.charAt(0).toUpperCase() +
          storedUser.lastName.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
