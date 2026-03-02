export const permissionGroups = [
  {
    name: "Lists permissions",
    keys: [
      "create:list",
      "update:list",
      "delete:list",
      "read:list",
      "read:all-lists",
    ],
  },
  {
    name: "Tasks permissions",
    keys: [
      "create:task",
      "update:task",
      "delete:task",
      "read:task",
      "read:all-tasks",
    ],
  },
  {
    name: "User management",
    keys: [
      "delete:user",
      "update:user",
      "manage:roles",
      "manage:permissions",
    ],
  },
  {
    name: "Analytics & dashboard",
    keys: ["read:analytics", "read:dashboard"],
  },
] as const;

