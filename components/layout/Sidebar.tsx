"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Trophy, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors mb-2",
        isActive
          ? "bg-blue-50 border-2 border-blue-200 text-blue-500"
          : "hover:bg-gray-100 text-gray-500"
      )}
    >
      <Icon
        className={cn(
          "w-7 h-7",
          isActive ? "fill-blue-500 text-blue-500" : "text-gray-400"
        )}
      />
      <span className={cn("font-bold text-sm tracking-wide uppercase", isActive ? "text-blue-500" : "text-gray-500")}>
        {label}
      </span>
    </Link>
  );
};

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-[256px] h-screen border-r-2 border-gray-200 p-6 fixed left-0 top-0 bg-white z-50">
        <Link href="/" className="mb-8 px-4 flex items-center gap-2">
           <div className="text-2xl font-extrabold text-[#58cc02] tracking-tighter">TOPIK EZ</div>
        </Link>

        <div className="flex-1">
          <SidebarItem icon={Home} label="Learn" href="/" isActive={pathname === "/"} />
          <SidebarItem icon={Trophy} label="Leaderboard" href="/leaderboard" isActive={pathname === "/leaderboard"} />
          <SidebarItem icon={BookOpen} label="Quests" href="/quests" isActive={pathname === "/quests"} />
          <SidebarItem icon={Shield} label="Shop" href="/shop" isActive={pathname === "/shop"} />
          <SidebarItem icon={User} label="Profile" href="/profile" isActive={pathname === "/profile"} />
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full h-20 bg-white border-t-2 border-gray-200 z-50 flex justify-around items-center px-2">
        <Link href="/" className="flex flex-col items-center p-2">
          <Home className={cn("w-7 h-7 mb-1", pathname === "/" ? "text-blue-500 fill-blue-500" : "text-gray-400")} />
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center p-2">
          <Trophy className={cn("w-7 h-7 mb-1", pathname === "/leaderboard" ? "text-blue-500 fill-blue-500" : "text-gray-400")} />
        </Link>
        <Link href="/profile" className="flex flex-col items-center p-2">
          <User className={cn("w-7 h-7 mb-1", pathname === "/profile" ? "text-blue-500 fill-blue-500" : "text-gray-400")} />
        </Link>
      </div>
    </div>
  );
};
