import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TypePage from "./pages/TypePage";
import NewEntry from "./pages/NewEntry";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate
        to='login'
        replace
      />
    ),
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "home",
    element: <RootLayout />,
    children: [
      {
        path: ":page",
        element: <Content />,
        children: [
          {
            index: true,
            element: <TypePage />,
          },
          {
            path: "new",
            element: <NewEntry />,
          },
          {
            path: "edit/:id",
            element: <NewEntry />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
