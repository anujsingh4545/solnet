import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./constants/layouts/AppLayout"
import Home from "./pages/Home"


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

  return  <RouterProvider router={router} />
}

export default App
