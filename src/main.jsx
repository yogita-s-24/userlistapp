import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Form from "./components/Form.jsx";
import UserProvider from "./components/userProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/form",
    element: <Form />,
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
