import React from "react";
import {Route, Routes} from "react-router-dom";

import Mall from "./pages/mall";
import Admin from "./pages/admin";

import "./App.scss";

const App = () => {
  return (
      <Routes>
          <Route path="/admin/key/*" element={<Admin/>} />
          <Route path="/*" element={<Mall/>} />
      </Routes>
  );
};

export default App;
