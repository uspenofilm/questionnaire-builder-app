import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header.jsx";

const CatalogPage = lazy(() =>
  import("../../pages/CatalogPage/CatalogPage.jsx")
);
const BuilderPage = lazy(() =>
  import("../../pages/BuilderPage/BuilderPage.jsx")
);
const InteractivePage = lazy(() =>
  import("../../pages/InteractivePage/InteractivePage.jsx")
);
const EditPage = lazy(() => import("../../pages/EditPage/EditPage.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<CatalogPage />}></Route>
          <Route path="/:id/run" element={<InteractivePage />}></Route>
          <Route path="/:id/edit" element={<EditPage />}></Route>
          <Route path="/builder" element={<BuilderPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
