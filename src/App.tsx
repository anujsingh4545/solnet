import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./constants/layouts/AppLayout"
import Home from "./pages/Home"
import ThemeModeManager from "./states/ThemeModeManager"


function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout/>,
      children:[
        {
          path:"/",
          element: <Home/>
        }
      ]
    }
  ])

  return  <ThemeModeManager><RouterProvider router={router} /></ThemeModeManager>
}

export default App
