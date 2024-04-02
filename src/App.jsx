import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CollectData from "./routes/CollectData";
import DisplayData from "./routes/DisplayData";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DisplayData />,
    },
    {
      path: "/collect",
      element: <CollectData />,
    },
  ]);

  return <RouterProvider router={router} />;
}
