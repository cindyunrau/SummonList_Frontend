import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddCreature from "./components/AddCreature";
import Creature from "./components/CreatureList.js";
import CreatureList from "./components/CreatureList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/creatures" className="navbar-brand">
          CindyUnrau
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/creatures"} className="nav-link">
              Creatures
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
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
