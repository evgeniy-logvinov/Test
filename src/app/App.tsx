import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <AppProvider>
      <div className="size-full">
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </div>
    </AppProvider>
  );
}

export default App;