type UserProfileData = {
  name: string;
  email: string;
  role: string;
};

type UserInfo = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  permissions: string[];
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
};

type Response<T, D> = {
  data: T[];
  pagination: D;
};

type AdminResponse = Response<UserInfo, Pagination>;

type TableParams = {
  searchField?: string;
  sort?: string;
  role?: "all" | "user" | "admin";
  order?: "asc" | "desc";
  hasMore?: boolean;
  limit?: number;
  q?: string;
};
type ToolBar = {
  searchField: string,
  role: TableParams["role"]
};

type UserRole = {
  role: "user" | "admin";
};

type Roles = {
  name: string;
  value: "user" | "admin";
};

type UserPermissions = {
  permissions: string[];
};

type Permissions = {
  key: string;
  value: string;
  category: string;
  description: string;
};

type Tabs = {
  id: string;
  label: string;
};

type UserPayload = {
  role: "user" | "admin";
  permissions: string[];
};

type DateVariant = "short" | "long";

type UsersFilterMode = "all" | "admin" | "user";

type SortFilterMode = "desc" | "asc";

type UsersFilters = {
  search: string;
  role: "all" | "admin" | "user";
  sortOrder: "desc" | "asc";
};
export const ALL_PERMISSIONS = [
  "create:list",
  "read:list",
  "update:list",
  "delete:list",
  "create:task",
  "read:task",
  "update:task",
  "delete:task",
  "read:dashboard",
  "read:all-lists",
  "read:all-tasks",
  "read:users",
  "update:user",
  "delete:user",
  "manage:roles",
  "manage:permissions",
  "read:analytics",
] as const;

export type Permission = typeof ALL_PERMISSIONS[number];

export type {
  UsersFilters,
  SortFilterMode,
  UsersFilterMode,
  UserProfileData,
  UserInfo,
  AdminResponse,
  TableParams,
  ToolBar,
  UserRole,
  UserPermissions,
  Permissions,
  Roles,
  Tabs,
  UserPayload,
  Response,
  Pagination,
  DateVariant,
};
