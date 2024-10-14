"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/service/auth.service";
import useSidebarStore from "@/store/sidebarStore";
import userStore from "@/store/userStore";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  User,
  Users,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const { user, clearUser } = userStore();

  const userPlaceholder = user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join("");
  const handleNavigation = (path, item) => {
    router.push(path);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.status == "success") {
        router.push("/user-login");
        clearUser();
      }
      toast.success("user logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("failed to log out");
    }
  };
  return (
    <aside
      className={`fixed top-16 left-0 h-full w-64 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 ${
        isSidebarOpen
          ? "translate-x-0 bg-white dark:bg-[rgb(36,37,38)] shadow-lg "
          : " -translate-x-full"
      } ${isSidebarOpen ? "md:hidden" : ""} md:bg-transparent md:shadow-none`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* navigation menu yaha pr */}
        <nav className="space-y-4 flex-grow">
          <div className="flex items-center space-x-2 cursor-pointer "    onClick={() => handleNavigation(`/user-profile/${user?._id}`)}>
            <Avatar className="h-10 w-10">
              {user?.profilePicture ? (
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
              ) : (
                <AvatarFallback className="dark:bg-gray-400">
                  {userPlaceholder}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="font-semibold">{user?.username}</span>
          </div>
          <Button
            variant="ghost"
            className="full justify-start"
            onClick={() => handleNavigation("/")}
          >
            <Home className="mr-4" /> Home
          </Button>
          <Button
            variant="ghost"
            className="full justify-start"
            onClick={() => handleNavigation("/friends-list")}
          >
            <Users className="mr-4" /> Friends
          </Button>
          <Button
            variant="ghost"
            className="full justify-start"
            onClick={() => handleNavigation("/video-feed")}
          >
            <Video className="mr-4" /> Video
          </Button>
          <Button
            variant="ghost"
            className="full justify-start"
            onClick={() => handleNavigation(`/user-profile/${user?._id}`)}
          >
            <User className="mr-4" /> Profile
          </Button>
          <Button variant="ghost" className="full justify-start">
            <MessageCircle className="mr-4" /> Messages
          </Button>

          <Button variant="ghost" className="full justify-start">
            <Bell className="mr-4" /> Notification
          </Button>
        </nav>

        {/* footer section */}

        <div className="mb-16">
          <Separator className="my-4" />
          <div className="flex items-center space-x-2 mb-4 cursor-pointer "    onClick={() => handleNavigation(`/user-profile/${user?._id}`)}>
            <Avatar className="h-10 w-10">
              {user?.profilePicture ? (
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
              ) : (
                <AvatarFallback className="dark:bg-gray-400">
                  {userPlaceholder}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="font-semibold">{user?.username}</span>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
          <Button variant="ghost" className="cursor-pointer -ml-4 " onClick={handleLogout} >
            <LogOut /> <span className="ml-2 font-bold text-md">Logout</span>
          </Button>
            <p>Privacy · Terms · Advertising ·</p>
            <p>· Meta © 2024</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
