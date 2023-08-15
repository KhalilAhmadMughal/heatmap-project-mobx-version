import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchHeatmapData } from "./store/heatmap/heatmapThunks";

import { clientSideRoutes } from "./routes";
import store from "./store";

function App() {
  const dispatch = store.dispatch;

  useEffect(() => {
    dispatch(fetchHeatmapData() as never);
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
export default App;
