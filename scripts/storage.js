// storage

export const storage = {
  users: {
    getUser: () => {
      return JSON.parse(localStorage.getItem("users")) || [];
    },
    setUser: (users) => {
      localStorage.setItem("users", JSON.stringify(users));
    },
  },
  roles: {
    getRole: () => {},
    setRole: () => {},
  },
  permissions: {
    getPermission: () => {},
    setPermission: () => {},
  },
  todos: {
    getTodo: () => {},
    setTodo: () => {},
  },
};

// fetch
export async function getFromJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
