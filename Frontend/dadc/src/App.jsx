import Content from "./components/Content";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="sm:flex h-screen bg-white overflow-hidden">
        <Routes>
          <Route path="drive" element={<Content />}>
            <Route path=":folderId" element={<Content />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
