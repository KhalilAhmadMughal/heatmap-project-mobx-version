import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { clientSideRoutes } from "./routes";
import { StoreContext } from "./store.context";
import { observer } from "mobx-react-lite";

function AppView() {
  const store = useContext(StoreContext);
  const { getHeatmapData_method } = store.heatmapStore;
  useEffect(() => {
    getHeatmapData_method();
  }, []);

  return (
    <main className="main-container">
      <Routes>
        {clientSideRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </main>
  );
}
const App = observer(AppView);
export default App;
