export type SidebarItem = {
  label: string;
  path: string;
  icon: string;
  permissions?: string[];
};

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", path: "/", icon: "home", permissions: ["read:dashboard"] },
  { label: "Lists", path: "/lists", icon: "list", permissions: ["read:list"] },
  { label: "Analytics", path: "/analytics", icon: "bar-chart-2", permissions: ["read:analytics"] },
  { label: "Profile", path: "/profile", icon: "user" },
  { label: "Admin Panel", path: "/users", icon: "settings", permissions: ["read:users"] },
];
