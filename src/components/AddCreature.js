import React, { useState } from "react";
import CreatureDataService from "../services/CreatureService";
import styled,{css} from 'styled-components'
import { Button } from '../styles/theme'
import * as monsterSchema from "../data/monsterSchema.json"

const sizeOptions = monsterSchema.default.properties.size.enum;
const typeOptions = monsterSchema.default.properties.type.enum;

const FormContainer = styled.form`
  display:grid;
  grid-template-columns: 1fr ;
  grid-template-rows: 1fr;


`
const TextForm = styled.div`
${props =>
  props.small &&
  css`
    width:400px;
  `
};
  grid-row: ${props => props.row}
  
`

const IntForm = styled.div`

  float:left;

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
      type: Creature.type,
      size: Creature.size,
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
          <TextForm small="true" row="1">
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
          <div row="2">
            <label htmlFor="size">Size</label>
            <select className="form-control" 
              name="size"
              value={Creature.size}
              onChange={handleInputChange}
              defaultValue={'default'}>
              <option value='default' disabled>Please select</option>
              {sizeOptions.map((option, _) => (
                <option key={option}>{option}</option>
                ))}
            </select>
          </div>
          <div row="2">
            <label htmlFor="type">Type</label>
            <select className="form-control" 
              name="type"
              value={Creature.type}
              onChange={handleInputChange}
              defaultValue={'default'}>
              <option value='default' disabled>Please select</option>
              {typeOptions.map((option, _) => (
                <option key={option}>{option}</option>
                ))}
            </select>
          </div>
          <div row="3">
            <IntForm className="form-group">
              <label htmlFor="cr">CR</label>
              <input
                type="number"
                className="form-control"
                id="cr"
                value={Creature.challenge_rating}
                onChange={handleInputChange}
                name="cr"
              />
            </IntForm>
            <IntForm className="form-group">
              <label htmlFor="str">str</label>
              <input
                type="number"
                className="form-control"
                id="str"
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
                value={Creature.cha}
                onChange={handleInputChange}
                name="cha"
              /></IntForm>
            </div>
          <Button onClick={saveCreature} >
            Submit
          </Button>
        </FormContainer>
      )}
    </div>
  );

};
export default AddCreature;