// import './App.css'

import { Toaster } from "sonner";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
