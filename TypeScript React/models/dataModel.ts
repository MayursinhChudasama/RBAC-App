export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  todos: number[];
}

export interface Role {
  id: number;
  name: string;
  permission: number[];
}

export interface Permission {
  id: number;
  name: string;
  type: string;
}

export interface Todo {
  id: number;
  title: string;
  status: boolean;
}

export interface Data {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  todos: Todo[];
}
