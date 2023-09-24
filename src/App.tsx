import { Outlet } from "react-router-dom";
import { WarningProvider } from "./contexts/warningContext";
import "./App.scss";
import AppAlert from "./components/Alert";

const App = () => {
  return (
    <WarningProvider>
      <AppAlert />
      <Outlet />
    </WarningProvider>
  );
};

export default App;
