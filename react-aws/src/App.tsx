// import AdminPage from "./pages/adminPage/AdminPage";
// import AdminPage from "./pages/adminPage/AdminPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserPage from "./pages/UserPage/UserPage";
import AdminPage from "./pages/adminPage/AdminPage";
import Home from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
