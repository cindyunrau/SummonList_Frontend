import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { css } from 'styled-components'

import { AddCreature, Creature, CreatureList, NavBar } from "./components"

function App() {
  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<CreatureList />} />
          <Route exact path={"/creatures"} element={<CreatureList />} />
          <Route exact path="/add" element={<AddCreature />} />
          <Route path="/creatures/:id" element={<Creature />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
