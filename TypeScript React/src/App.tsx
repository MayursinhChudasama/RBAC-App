import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

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

  return <RouterProvider router={router} />;
}

export default App;
