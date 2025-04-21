// storage

export const storage = {
  users: {
    getData: () => {
      return JSON.parse(localStorage.getItem("users")) || [];
    },
    setData: (users) => {
      localStorage.setItem("users", JSON.stringify(users));
    },
  },
  roles: {
    getData: () => {
      return JSON.parse(localStorage.getItem("roles")) || [];
    },
    setData: (roles) => {
      localStorage.setItem("roles", JSON.stringify(roles));
    },
  },
  permissions: {
    getData: () => {
      return JSON.parse(localStorage.getItem("permissions")) || [];
    },
    setData: (permissions) => {
      localStorage.setItem("permissions", JSON.stringify(permissions));
    },
  },
  todos: {
    getData: () => {
      return JSON.parse(localStorage.getItem("todos")) || [];
    },
    setData: (todos) => {
      localStorage.setItem("todos", JSON.stringify(todos));
    },
  },
};

// fetch
export async function getFromJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//
