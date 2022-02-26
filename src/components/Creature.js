import React, { useState, useEffect } from "react";
import CreatureDataService from "../services/CreatureService";

const Creature = props => {
  const initialCreatureState = {
    id: null,
    name: "",
    description: "",
    base: false
  };

  const [currentCreature, setCurrentCreature] = useState(initialCreatureState);
  const [message, setMessage] = useState("");

  const getCreature = id => {
    CreatureDataService.get(id)
      .then(response => {
        setCurrentCreature(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCreature(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCreature({ ...currentCreature, [name]: value });
  };

  const updatebase = status => {
    var data = {
      id: currentCreature.id,
      name: currentCreature.name,
      description: currentCreature.description,
      base: status
    };
    CreatureDataService.update(currentCreature.id, data)
      .then(response => {
        setCurrentCreature({ ...currentCreature, base: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCreature = () => {
    CreatureDataService.update(currentCreature.id, currentCreature)
      .then(response => {
        console.log(response.data);
        setMessage("The Creature was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCreature = () => {
    CreatureDataService.remove(currentCreature.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/Creatures");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCreature ? (
        <div className="edit-form">
          <h4>Creature</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCreature.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCreature.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCreature.base ? "base" : "Pending"}
            </div>
          </form>
          {currentCreature.base ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatebase(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatebase(true)}
            >
              Publish
            </button>
          )}
          <button className="badge badge-danger mr-2" onClick={deleteCreature}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCreature}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Creature...</p>
        </div>
      )}
    </div>
  );
};

export default Creature;