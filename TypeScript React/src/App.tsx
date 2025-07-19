import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navigate
          to='/login'
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
      element: <HomePage />,
      children: [
        // {
        //   path: ":page",
        //   element: <Content />,
        //   children: [
        //     {
        //       index: true,
        //       element: <TypePage />,
        //     },
        //     {
        //       path: "new",
        //       element: <NewEntry />,
        //     },
        //     {
        //       path: "edit/:id",
        //       element: <NewEntry />,
        //     },
        //   ],
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
