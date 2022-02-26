import React, { useState } from "react";
import CreatureDataService from "../services/CreatureService";

const AddCreature = () => {
  const initialCreatureState = {
    id: null,
    name: "",
    description: "",
    base: false
  };

  const [Creature, setCreature] = useState(initialCreatureState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCreature({ ...Creature, [name]: value });
  };

  const saveCreature = () => {
    var data = {
      name: Creature.name,
      description: Creature.description
    };
    CreatureDataService.create(data)
      .then(response => {
        setCreature({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          base: response.data.base
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCreature = () => {
    setCreature(initialCreatureState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCreature}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={Creature.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={Creature.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={saveCreature} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );

};
export default AddCreature;