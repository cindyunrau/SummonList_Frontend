import React, { useState, useReducer } from "react";
import CreatureDataService from "../services/CreatureService";
import styled from 'styled-components'
import { Remove } from '../styles/theme'
import * as monsterSchema from "../data/monsterSchema.json"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/styles.css";
import $ from 'jquery';

const sizeOptions = monsterSchema.default.properties.size.enum;
const typeOptions = monsterSchema.default.properties.type.enum;
const abilityOptions = ["str","dex","con","int","wis","cha"];
const speedOptions = monsterSchema.default.properties.speed.enum;

const Toggle = styled(Dropdown.Toggle)`
  border-radius: 10rem;
    :after {
        display: none;
    }
`;

const AddCreature = () => {
  const formReducer = (state, event) => {
    console.log(JSON.stringify(event))
    if(abilityOptions.includes(event.name)) {
      return {
        ...state,
        ["ability_scores"]: {
          ...state.ability_scores,
          [event.name]: event.value
        }
      }
    } else if(speedOptions.includes(event.name)) {
      return {
        ...state,
        ["speed"]: {
          ...state.speed,
          [event.name]: event.value
        }
      }
    } else if (event.name === "hit_points"){
      return {
        ...state,
        ["hit_points"]: {
          ...state.hit_points,
          ["max"]: event.value
        }
      }
    } else if (event.name.includes("dice")){
      return {
        ...state,
        ["hit_points"]: {
          ...state.hit_points,
          ["dice"]: {
            ...state.hit_points.dice,
            [event.name.replace("dice_","")]: event.value
          }
        }
      }
    }
    return {
      ...state,
      [event.name]: event.value
    }
  }

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [visibleSpeedOptions, setVisibleSpeedOptions] = useState(["Walk"]);


  const handleChange = event => {
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
    console.log(formData);
  }

  const addSpeedRow = (option) => {
    if(!visibleSpeedOptions.includes(option)){
      setVisibleSpeedOptions(oldOptions => [...oldOptions, option])
    }
  }

  const removeSpeedRow = (option) => {
    if(visibleSpeedOptions.includes(option)){
      setVisibleSpeedOptions(visibleSpeedOptions.filter(item => item !== option))
    }
  }

  const saveCreature = () => {
    CreatureDataService.create(formData)
      .then(response => {
        console.log(response)
        if(response.status === 200){
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

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success">
            Add Another
          </button>
        </div>
      ) : (
        <Form>
          <div className="auto-row">
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="" 
                id="name"
                onChange={handleChange}
                name="name"/>
            </Form.Group>
          </div>

          <div className="auto-row">
            <div>
              <label htmlFor="size">Size</label>
              <select className="form-control" 
                name="size"
                onChange={handleChange}
                defaultValue={'default'}>
                <option value='default' disabled>Please select</option>
                {sizeOptions.map((option, _) => (
                  <option key={option}>{option}</option>
                  ))}
                <option id="other_size_option" key="Other">Other</option>
              </select>
              {document.getElementById('other_size_option') && document.getElementById('other_size_option').selected ?
              <input className="form-control" 
                name="size"
                onChange={handleChange}
                placeholder="Please Enter Size">
              </input>
              : null }
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <select className="form-control" 
                name="type"
                onChange={handleChange}
                defaultValue={'default'}>
                <option value='default' disabled>Please select</option>
                {typeOptions.map((option, _) => (
                  <option key={option}>{option}</option>
                  ))}
                <option id="other_type_option" key="Other">Other</option>
              </select>
              {document.getElementById('other_type_option') && document.getElementById('other_type_option').selected ?
              <input className="form-control" 
                name="size"
                onChange={handleChange}
                placeholder="Please Enter Type">
              </input>
              : null }
            </div>
            </div>

          <div className="auto-row">
            <Form.Group>
              <Form.Label>CR:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="cr"
                onChange={handleChange}
                name="challenge_rating"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hit Points:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="hp"
                onChange={handleChange}
                name="hit_points"/>
                {$("#hp").val() ? 
                  <div className="auto-row">
                    <div>
                      <Form.Control 
                      type="number" 
                      placeholder="" 
                      id="dice_sides"
                      onChange={handleChange}
                      name="dice_sides"/>
                    </div>
                    <div>
                      <Form.Control 
                      type="number" 
                      placeholder="" 
                      id="dice_count"
                      onChange={handleChange}
                      name="dice_count"/>
                    </div>
                    <div>
                      <Form.Control 
                      type="number" 
                      placeholder="" 
                      id="dice_mod"
                      onChange={handleChange}
                      name="dice_mod"/>
                    </div>
                  </div>
                  
                : null}
            </Form.Group>
            </div>

          <div className="auto-row" onChange={handleChange} name="ability_scores">
            <Form.Group>
              <Form.Label>STR:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="str"
                onChange={handleChange}
                name="str"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>DEX:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="dex"
                onChange={handleChange}
                name="dex"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>CON:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="con"
                onChange={handleChange}
                name="con"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>INT:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="int"
                onChange={handleChange}
                name="int"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>WIS:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="wis"
                onChange={handleChange}
                name="wis"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>CHA:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="cha"
                onChange={handleChange}
                name="cha"/>
            </Form.Group>
          </div>

          <div className="auto-row">
            <div className="auto-column">
              <label htmlFor="speed">Speed: </label>
              {visibleSpeedOptions.map((option, _) => (
                  <Form.Group className="auto-row speed-row" controlId="formBasicEmail" key={option}>
                    <Form.Label>{option}:</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      onChange={handleChange}
                      name={option} />
                    <Form.Label>ft.</Form.Label>
                    {option !== "Walk" ? <Remove onClick={() => removeSpeedRow(option)}></Remove> : <div></div>}
                  </Form.Group>
                  
                ))}

              {speedOptions.length !== visibleSpeedOptions.length ?
              <Dropdown id="speedDropdown">
                <Toggle variant="success" id="dropdown-basic">
                  +
                </Toggle>
                <Dropdown.Menu>
                {speedOptions.map((option, _) => (
                  (!visibleSpeedOptions.includes(option)) ? 
                  <Dropdown.Item key={option} onClick={() => addSpeedRow(option)}>{option}</Dropdown.Item>
                  : <Dropdown.Item key={option} onClick={() => addSpeedRow(option)} disabled>{option}</Dropdown.Item>
                ))}
                </Dropdown.Menu>
              </Dropdown>
              : null }
                
            </div>



            <div className="auto-column">
              <label htmlFor="speed">test: </label>
            </div>
            <div className="auto-column">
              <label htmlFor="speed">test: </label>
            </div>
            </div>

          <div className="auto-row">
            <Button onClick={saveCreature} >
              Submit
            </Button>
            </div>
        </Form>
      )}
    </div>
  );

};
export default AddCreature;