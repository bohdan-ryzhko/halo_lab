import { Route, Routes } from "react-router-dom";
import { Game, Welcome } from "./pages";
import { routes } from "./constants";

function App() {
  return (
    <Routes>
      <Route path={routes.welcome} element={<Welcome />} />
      <Route path={routes.game} element={<Game />} />
      <Route path={routes.notFound} element={<>Not Found</>} />
    </Routes>
  );
}

export default App;
