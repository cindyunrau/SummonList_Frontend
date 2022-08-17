import React, { useState, useReducer } from "react";
import CreatureDataService from "../services/CreatureService";
import styled from 'styled-components'
import { Add, Remove } from '../styles/theme'
import * as monsterSchema from "../data/monsterSchema.json"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/styles.css";
import $ from 'jquery';

const sizeOptions = monsterSchema.default.properties.size.enum;
const typeOptions = monsterSchema.default.properties.type.enum;
const abilityOptions = ["str","dex","con","int","wis","cha"];
const savingThrowOptions = ["Str","Dex","Con","Int","Wis","Cha"];
const speedOptions = monsterSchema.default.properties.speed.enum;
const skillOptions = monsterSchema.default.properties.skills.enum
const alignmentOptions = ["Lawful Good","Lawful Neutral","Lawful Evil","Neutral Good","True Neutral","Neutral Evil","Chaotic Good","Chaotic Neutral","Chaotic Evil","Any Alignment"];
const languageOptions = ["Abyssal","Aquan","Auran","Celestial","Common","Deep Speech","Draconic","Dwarvish","Elvish","Giant","Gnomish","Goblin","Halfling","Ignan","Infernal","Orc","Primordial","Sylvan","Terran","Undercommon"]

const Toggle = styled(Dropdown.Toggle)`
  border-radius: 10rem;
    :after {
        display: none;
    }
`;


const AddCreature = () => {
  const formReducer = (state, action) => {
    console.log("State " + JSON.stringify(state))
    console.log("Action " + JSON.stringify(action))
    if(action.payload === "Other"){
      return {...state};
    }
    if(action.type === "array"){
      if(!state[action.subtype])
          state = {
            [action.subtype] : []
          }
      }

    if(action.subtype){
      switch(action.type) {
        case "hit_points":
          switch(action.subtype) {
            case "max":
              return {
                ...state,
                [action.type]: {
                  ...state.hit_points,
                  [action.subtype]: action.payload
                }
              }
            default:
              return {
                ...state,
                [action.type]: {
                  ...state.hit_points,
                  ["dice"]: {
                    ...state.hit_points.dice,
                    [action.subtype]: action.payload
                  }
                }
              }
          } 
        case "array":
          return {
            ...state,
            [action.subtype]: [...state[action.subtype], action.payload]
            }
        default:
          return {
            ...state,
            [action.type]: {
              ...state[action.type],
              [action.subtype]: action.payload
            }
          }
        }
    } else {
      switch(action.type){

        default:
          return {
            ...state,
            [action.type]: action.payload
          }
      }
    } 
  }

  const [submitted, setSubmitted] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, {});
  const [visibleSpeedOptions, setVisibleSpeedOptions] = useState(["Walk"]);
  const [visibleSavingThrowOptions, setVisibleSavingThrowOptions] = useState([]);
  const [visibleSkillOptions, setVisibleSkillOptions] = useState([]);


  const handleChange = event => {
    const subtype = $(`#${event.target.id}`).attr("subtype")
    dispatch({
      type: event.target.name,
      subtype: subtype,
      payload: event.target.value,
    });
  }

  const addTrait = (name, description) => {
    const nameValue = name.val();
    const descriptionValue = description.val()
    const payload = {
      "name" : nameValue,
      "description" : descriptionValue
      
    }
    if(nameValue && descriptionValue){
      dispatch({
        type: "array",
        subtype: "traits",
        payload: payload,
      });
      name.val('');
      description.val('')
    }
  }
  
  const addOtherLanguage = (other) => {
    const lanValue = other.val();
    if(lanValue){
      dispatch({
        type: "array",
        subtype: "languages",
        payload: lanValue,
      });
      other.val('');
    }
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

  const addSavingRow = (option) => {
    if(!visibleSavingThrowOptions.includes(option)){
      setVisibleSavingThrowOptions(oldOptions => [...oldOptions, option])
    }
  }

  const removeSavingRow = (option) => {
    if(visibleSavingThrowOptions.includes(option)){
      setVisibleSavingThrowOptions(visibleSavingThrowOptions.filter(item => item !== option))
    }
  }

  const addSkillRow = (option) => {
    if(!visibleSkillOptions.includes(option)){
      setVisibleSkillOptions(oldOptions => [...oldOptions, option])
    }
  }

  const removeSkillRow = (option) => {
    if(visibleSkillOptions.includes(option)){
      setVisibleSkillOptions(visibleSkillOptions.filter(item => item !== option))
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
              <Form.Label className="font-weight-bold">Name:</Form.Label>
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
              <label className="font-weight-bold">Size</label>
              <select className="form-control" 
                name="size"
                onChange={handleChange}
                id="size"
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
                id="size"
                onChange={handleChange}
                placeholder="Please Enter Size">
              </input>
              : null }
            </div>
            <div>
              <label className="font-weight-bold">Type</label>
              <select className="form-control" 
                name="type"
                onChange={handleChange}
                id="type"
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
            <div>
              <label className="font-weight-bold">Alignment</label>
              <select className="form-control" 
                name="alignment"
                id="alignment"
                onChange={handleChange}
                defaultValue={'default'}>
                <option value='default' disabled>Please select</option>
                {alignmentOptions.map((option, _) => (
                  <option key={option}>{option}</option>
                  ))}
              </select>
            </div>
            </div>

          <div className="auto-row">
            <Form.Group>
              <Form.Label className="font-weight-bold" >Challenge Rating:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="cr"
                onChange={handleChange}
                name="challenge_rating"/>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold" >Hit Points:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="hp"
                onChange={handleChange}
                name="hit_points"
                subtype="max"/>
                {$("#hp").val() ? 
                  <div className="auto-row">
                    <div>
                      <Form.Control 
                      type="number" 
                      placeholder="" 
                      id="dice_sides"
                      onChange={handleChange}
                      name="hit_points"
                      subtype="count"/>
                    </div>
                    <div>
                      <Form.Control 
                      type="number" 
                      placeholder="" 
                      id="dice_count"
                      onChange={handleChange}
                      name="hit_points"
                      subtype="sides"/>
                    </div>
                    <div>
                      <Form.Control 
                      type="number" 
                      placeholder="" 
                      id="dice_mod"
                      onChange={handleChange}
                      name="hit_points"
                      subtype="mod"/>
                    </div>
                  </div>
                  
                : null}
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold" >Armor Class:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="armor_class"
                onChange={handleChange}
                name="armor_class"
                subtype="value"/>
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
                name="ability_scores"
                subtype="str"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>DEX:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="dex"
                onChange={handleChange}
                name="ability_scores"
                subtype="dex"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>CON:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="con"
                onChange={handleChange}
                name="ability_scores"
                subtype="con"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>INT:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="int"
                onChange={handleChange}
                name="ability_scores"
                subtype="int"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>WIS:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="wis"
                onChange={handleChange}
                name="ability_scores"
                subtype="wis"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>CHA:</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="" 
                id="cha"
                onChange={handleChange}
                name="ability_scores"
                subtype="cha"/>
            </Form.Group>
          </div>

          <div className="auto-row">
            <div className="auto-column">
              <label className="font-weight-bold">Speed: </label>
              {visibleSpeedOptions.map((option, _) => (
                  <Form.Group className="auto-row speed-row" key={option} >
                    <Form.Label>{option}:</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      onChange={handleChange}
                      id={option} 
                      name="speed"
                      subtype={option} />
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
              <label className="font-weight-bold">Saving Throws: </label>
              {visibleSavingThrowOptions.map((option, _) => (
                  <Form.Group className="auto-row speed-row" key={option}>
                    <Form.Label>{option}:</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      onChange={handleChange}
                      id={option}
                      name="saving_throws"
                      subtype={option}  />
                    <Remove onClick={() => removeSavingRow(option)}></Remove>
                  </Form.Group>
                  
                ))}

              {savingThrowOptions.length !== visibleSavingThrowOptions.length ?
              <Dropdown id="savingThrowDropdown">
                <Toggle variant="success" id="dropdown-basic">
                  +
                </Toggle>
                <Dropdown.Menu>
                {savingThrowOptions.map((option, _) => (
                  (!visibleSavingThrowOptions.includes(option)) ? 
                  <Dropdown.Item key={option} onClick={() => addSavingRow(option)}>{option}</Dropdown.Item>
                  : <Dropdown.Item key={option} onClick={() => addSavingRow(option)} disabled>{option}</Dropdown.Item>
                ))}
                </Dropdown.Menu>
              </Dropdown>
              : null }
                
            </div>

            <div className="auto-column">
              <label className="font-weight-bold">Languages: </label>
              <div >
              {formData.languages ? formData.languages.map((option, index) => (
                <span className="red-hover">{(formData.languages.length !== 0 && index !== formData.languages.length-1) ? option + ", " : option}</span>
                )) : ""}
              </div>
              <select className="form-control" 
                subtype="languages"
                name="array"
                onChange={handleChange}
                id="languages"
                defaultValue={'default'}>
                <option value='default' disabled>Please select</option>
                {languageOptions.map((option, _) => (
                  (formData.languages && formData.languages.includes(option)) ?
                    <option disabled key={option}>{option}</option>
                  :
                    <option key={option}>{option}</option>
                  ))}
                <option id="other_language_option" key="Other">Other</option>
              </select>
              {document.getElementById('other_language_option') && document.getElementById('other_language_option').selected ?
                <div className="three-one-row">
                  <input className="form-control" 
                    subtype="languages"
                    id="other_language_field"
                    placeholder="Please Enter a Language">
                  </input>
                  <Button onClick={()=>addOtherLanguage($("#other_language_field"))}> Add </Button>
                </div>
              : null }
              
              
            </div>
          </div>

          <div className="auto-row">
            <div className="auto-column">
              <label className="font-weight-bold">Skills: </label>
              {visibleSkillOptions.map((option, _) => (
                  <Form.Group className="auto-row speed-row" key={option}>
                    <Form.Label>{option}:</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      onChange={handleChange}
                      name={option} />
                    <Remove onClick={() => removeSkillRow(option)}></Remove>
                  </Form.Group>
                  
                ))}

              {skillOptions.length !== visibleSkillOptions.length ?
              <Dropdown id="skillDropdown">
                <Toggle variant="success" id="dropdown-basic">
                  +
                </Toggle>
                <Dropdown.Menu>
                {skillOptions.map((option, _) => (
                  (!visibleSkillOptions.includes(option)) ? 
                  <Dropdown.Item key={option} onClick={() => addSkillRow(option)}>{option}</Dropdown.Item>
                  : <Dropdown.Item key={option} onClick={() => addSkillRow(option)} disabled>{option}</Dropdown.Item>
                ))}
                </Dropdown.Menu>
              </Dropdown>
              : null }
                
            </div>

            <div className="auto-column">
              <label htmlFor="speed">test: </label>
            </div>
           
          </div>

          <div className="auto-row">
            <div className="auto-column">
              <Form.Group>
                <Form.Label className="font-weight-bold" >Traits:</Form.Label> <br></br>
                {formData.traits ? formData.traits.map((option, _) => (
                  <div key = {option}>
                    <span className="font-weight-bold">{option.name}: {' '}</span>
                    <span >{option.description}</span>
                  </div>
                )): ""}
                <div className="long-row">
                  <Form.Label>Name:</Form.Label>
                  <Form.Label>Description:</Form.Label>
                  <div></div>
                </div>
                <div className="long-row">
                  <Form.Control 
                    type="text" 
                    placeholder="" 
                    id="traits_name"
                    name="traits"
                    subtype="name" /> 
                  <Form.Control 
                    type="text" 
                    placeholder="" 
                    id="traits_description"
                    name="traits"
                    subtype="description" />
                  <Button onClick={()=>addTrait($("#traits_name"),$("#traits_description"))}>Add</Button>
                </div>
                
              </Form.Group>
            </div>
          </div>
                  <br></br>
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