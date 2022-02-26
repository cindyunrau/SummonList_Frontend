import React, { useState, useEffect } from "react";
import CreatureDataService from "../services/CreatureService";
import { Link } from "react-router-dom";

const CreatureList = () => {
  const [Creatures, setCreatures] = useState([]);
  const [currentCreature, setCurrentCreature] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveCreatures();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCreatures = () => {
    CreatureDataService.getAll()
      .then(response => {
        setCreatures(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCreatures();
    setCurrentCreature(null);
    setCurrentIndex(-1);
  };

  const setActiveCreature = (Creature, index) => {
    setCurrentCreature(Creature);
    setCurrentIndex(index);
  };

  const removeAllCreatures = () => {
    CreatureDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    CreatureDataService.findByName(searchName)
      .then(response => {
        setCreatures(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Creatures List</h4>
        <ul className="list-group">
          {Creatures &&
            Creatures.map((Creature, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCreature(Creature, index)}
                key={index}
              >
                {Creature.name}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCreatures}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCreature ? (
          <div>
            <h4>Creature</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCreature.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentCreature.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCreature.base ? "Original" : "Imported"}
            </div>
            <Link
              to={"/Creatures/" + currentCreature.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Creature...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatureList;