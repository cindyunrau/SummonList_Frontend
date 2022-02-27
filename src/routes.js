import React from 'react';
import { Routes, Route} from 'react-router';
import { AddCreature, Creature, CreatureList } from "./components"

const CreateRoutes = () => (
    <Routes>
        <Route exact path={"/"} element={<CreatureList />} />
        <Route exact path={"/creatures"} element={<CreatureList />} />
        <Route exact path="/add" element={<AddCreature />} />
        <Route path="/creatures/:id" element={<Creature />} />
    </Routes>
);

export default CreateRoutes;