import React, { useState } from "react";
import CreatureDataService from "../services/CreatureService";
import styled,{css} from 'styled-components'

const FormContainer = styled.div`

`
const TextForm = styled.div`
${props =>
  props.small &&
  css`
    width:400px;
  `};
`

const IntForm = styled.div`
  width: 50px;
`
const AddCreature = () => {
  const initialCreatureState = {
    id: null,
    name: "",
    description: "",
    base: false,
    
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
      description: Creature.description,
      cr: Creature.cr,
      str: Creature.str,
      dex: Creature.dex,
      con: Creature.con,
      int: Creature.int,
      wis: Creature.wis,
      cha: Creature.cha,
    };
    CreatureDataService.create(data)
      .then(response => {
        console.log(response)
        if(response.status == 200){
          setSubmitted(true);
          console.log(response.data);
        } else {
          console.log("Some Unknown Error Occurred")
        }
        
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
            Add Another
          </button>
        </div>
      ) : (
        <FormContainer>
          <TextForm small="true">
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
          </TextForm>
          <TextForm>
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
          </TextForm>
          <IntForm className="form-group">
            <label htmlFor="cr">CR</label>
            <input
              type="int"
              className="form-control"
              id="cr"
              required
              value={Creature.cr}
              onChange={handleInputChange}
              name="cr"
            />
          </IntForm>
          <IntForm className="form-group">
            <label htmlFor="str">str</label>
            <input
              type="int"
              className="form-control"
              id="str"
              required
              value={Creature.str}
              onChange={handleInputChange}
              name="str"
            />
          </IntForm>
          <IntForm className="form-group">
            <label htmlFor="dex">dex</label>
            <input
              type="int"
              className="form-control"
              id="dex"
              required
              value={Creature.dex}
              onChange={handleInputChange}
              name="dex"
            /></IntForm>
            <IntForm className="form-group">
            <label htmlFor="con">con</label>
            <input
              type="int"
              className="form-control"
              id="con"
              required
              value={Creature.con}
              onChange={handleInputChange}
              name="con"
            /></IntForm>
            <IntForm className="form-group">
            <label htmlFor="int">int</label>
            <input
              type="int"
              className="form-control"
              id="int"
              required
              value={Creature.int}
              onChange={handleInputChange}
              name="int"
            /></IntForm>
            <IntForm className="form-group">
            <label htmlFor="wis">wis</label>
            <input
              type="int"
              className="form-control"
              id="wis"
              required
              value={Creature.wis}
              onChange={handleInputChange}
              name="wis"
            /></IntForm>
            <IntForm className="form-group">
            <label htmlFor="cha">cha</label>
            <input
              type="int"
              className="form-control"
              id="cha"
              required
              value={Creature.cha}
              onChange={handleInputChange}
              name="cha"
            /></IntForm>
          <button onClick={saveCreature} className="btn btn-success">
            Submit
          </button>
        </FormContainer>
      )}
    </div>
  );

};
export default AddCreature;