import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./app/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Mainpage from "./pages/Mainpage";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import Foods from "./pages/Foods";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import User from "./pages/User";
import ForgotModal from "./components/Modal/ForgotModel";
import ResetModal from "./components/Modal/ResetModel";
import Suggestion from "./pages/Suggestion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/signin",
        element: <Sign />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot",
        element: <ForgotModal />,
      },
      {
        path: "/reset/:otp",
        element: <ResetModal />,
      },
      {
        path: "/exercises",
        element: <Exercises />,
      },
      {
        path: "/foods",
        element: <Foods />,
      },
      {
        path: "/goals",
        element: <Goals />,
      },
      {
        path: "/suggestion",
        element: <Suggestion />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
