"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: "خانه", href: "/", auth: false },
    { label: "‌کارها", href: "/tasks", auth: true },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };

  const handleAuth = () => {
    if (session) {
      signOut();
    } else {
      router.push("/login");
    }
    setDrawerOpen(false);
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.auth && !session) return false;
    return true;
  });

  return (
    <>
      <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">سامانه مدیریت کارها</div>
            <div className="hidden md:flex space-x-4 space-x-reverse">
              {filteredMenuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="hover:bg-blue-700 px-3 py-2 rounded-md"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleAuth}
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                {session ? "خروج" : "ورود"}
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer برای موبایل */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setDrawerOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 w-64 bg-white h-full shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              {filteredMenuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-right"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleAuth}
                className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-right"
              >
                {session ? "خروج" : "ورود"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
