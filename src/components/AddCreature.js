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
const senseOptions = ["Passive Perception", "Blindsight","Darkvision","Tremorsense","Truesight"]
const armorOptions = ["Natural Armor","Padded Armor","Leather Armor","Studded Leather Armor","Hide Armor","Chain Shirt","Scale Mail","Breastplate","Half Plate","Ring Mail","Chain Mail","Splint","Plate"]
const damageTypes = ["Acid","Bludgeoning","Cold","Fire","Force","Lightning","Necrotic","Piercing","Poison","Psychic","Radiant","Slashing","Thunder"]
const conditionTypes = ["Blinded","Charmed","Deafened","Exhaustion","Frightened","Grappled","Incapacitated","Invisible","Paralyzed","Petrified","Poisoned","Prone","Restrained","Stunned","Unconscious"]
const commonTags = ["Legendary","Dragon","Elementals","Sphinxes","Animated Objects","Demons","Oozes","Devils","Golems","Giants","Genies","Angels","Mephits","Ghouls","Hags","Nagas","Skeletons","Mummies","Zombies","Dinosaurs","Undead","Fungi","Plants","Vampires","Lycanthropes","Shapeshifters"]

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
            ...state,
            [action.subtype] : []
          }
      }
    
    if(action.type === "remove"){
      switch(action.subtype) {
        default:
          return {
            ...state,
            [action.subtype]: state[action.subtype].filter(item => item !== action.payload)
          }
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
  const [visibleSenseOptions, setVisibleSenseOptions] = useState(["Passive Perception"]);


  const handleChange = event => {
    const subtype = $(`#${event.target.id}`).attr("subtype")
    if(event.target.type === "checkbox"){
      dispatch({
        type: event.target.name,
        subtype: subtype,
        payload: $(`#${event.target.id}`).is(":checked"),
      });
    } else {
      dispatch({
        type: event.target.name,
        subtype: subtype,
        payload: event.target.value,
      });
    }
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

  const removeTrait = (name) => {
    dispatch({
      type: "remove",
      subtype: "traits",
      payload: name,
    });
  }

  
  const addOther = (type, other) => {
    const value = other.val()
    if(value){
      dispatch({
        type: "array",
        subtype: type,
        payload: value,
      });
      other.val('');
    }
  }

  const handleRemove = (type, language) => {
    dispatch({
      type: "remove",
      subtype: type,
      payload: language,
    });
  }

  const addAction = () => {
    const nameValue = $("#action_name").val();
    const descriptionValue = $("#action_description").val();
    const legendaryValue = $("#action_legendary").is(":checked");
    const reactionValue = $("#action_reaction").is(":checked");
    const payload = {
      "name" : nameValue,
      "description" : descriptionValue,
      "legendary" : legendaryValue,
      "reaction" : reactionValue
    }
    if(nameValue && descriptionValue){
      dispatch({
        type: "array",
        subtype: "actions",
        payload: payload,
      });
      $("#action_name").val('');
      $("#action_description").val('')
      $("#action_legendary").prop( "checked", false );
      $("#action_reaction").prop( "checked", false );
    }
    if(legendaryValue){
      addTag("Legendary")
    }
  }

  const addTagForm = () => {
    const tagValue = $("#tags").val();
    if(tagValue){
      dispatch({
        type: "array",
        subtype: "tags",
        payload: tagValue,
      });
    }
    $("#tags").val('');
  }

  const addTag = (tag) => {
    if(tag){
      dispatch({
        type: "array",
        subtype: "tags",
        payload: tag,
      });
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

  const addSenseRow = (option) => {
    if(!visibleSenseOptions.includes(option)){
      setVisibleSenseOptions(oldOptions => [...oldOptions, option])
    }
  }

  const removeSenseRow = (option) => {
    if(visibleSenseOptions.includes(option)){
      setVisibleSenseOptions(visibleSenseOptions.filter(item => item !== option))
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
            <Form.Group>
              <Form.Label className="font-weight-bold">Subtype:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="" 
                id="subtype"
                onChange={handleChange}
                name="subtype"/>
            </Form.Group>
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
            <div>
              <Form.Label className="font-weight-bold" >Armor Class:</Form.Label>
              <div className="auto-row">
                <Form.Group>
                  <Form.Control 
                    type="number" 
                    placeholder="" 
                    id="armor_class_value"
                    onChange={handleChange}
                    name="armor_class"
                    subtype="value"/>
                </Form.Group>

                <select className="form-control" 
                  name="armor_class"
                  id="armor_class_description"
                  onChange={handleChange}
                  defaultValue={'default'}
                  subtype="description">
                  <option value='default' disabled>Please select</option>
                  {armorOptions.map((option, _) => (
                    <option key={option}>{option}</option>
                    ))}
                </select>
              </div>
              <Form.Check 
                    type="checkbox"
                    id="armor_class_shield"
                    onChange={handleChange}
                    label={`Shield`}
                    name="armor_class"
                    subtype="shield"
                  />
            </div>
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
                      id={option.replace(/ /g,'')} 
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
                      id={option.replace(/ /g,'')}
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
              {formData.languages ? 
                <div >
                  {formData.languages.map((option, index) => (
                    <span 
                    className="red-hover" 
                    key={option} 
                    onClick={() => handleRemove("languages" ,option)}
                    name="deleteLanguage"
                    id="language-display">
                      {(formData.languages.length !== 0 && index !== formData.languages.length-1) ? option + ", " : option}
                    </span>
                  ))}
                </div>
              : null }
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
                  <Button onClick={()=>addOther("languagues",$("#other_language_field"))}> Add </Button>
                </div>
              : null }
              <Form.Check 
                type="checkbox"
                id="telepathy"
                label={`Telepathy`}
                name="languages"
                subtype="telepathy"
              />
              
              
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
                      id={option.replace(/ /g,'')}
                      name="skills"
                      subtype={option}/>
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
              <label className="font-weight-bold">Senses: </label>

              {visibleSenseOptions.map((option, _) => (
                  <Form.Group className="auto-row sense-row" key={option}>
                    <Form.Label>{option}:</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      onChange={handleChange}
                      id={option.replace(/ /g,'')}
                      name="senses"
                      subtype={`${option}`}/>
                    {option !== "Passive Perception" ? 
                      <Form.Label>ft.</Form.Label>
                    : <div></div>}
                    {option !== "Passive Perception" ? 
                      <Remove onClick={() => removeSenseRow(option)}></Remove>
                    : <div></div>}
                  </Form.Group>
                  
              ))}

              {senseOptions.length !== (formData.senses ? formData.senses.length : -1) ?
              <Dropdown id="senseDropdown">
                <Toggle variant="success" id="dropdown-basic">
                  +
                </Toggle>
                <Dropdown.Menu>
                {senseOptions.map((option, _) => (
                  (!visibleSenseOptions.includes(option)) ? 
                  <Dropdown.Item key={option} onClick={() => addSenseRow(option)}>{option}</Dropdown.Item>
                  : <Dropdown.Item key={option} onClick={() => addSenseRow(option)} disabled>{option}</Dropdown.Item>
                ))}
                </Dropdown.Menu>
              </Dropdown>
              : null }
            </div>
          </div>

          <div className="auto-row">
            <div className="auto-column">
                <label className="font-weight-bold">Damage Vulnerabilities: </label>
                {formData.vulnerabilities ? 
                  <div >
                    {formData.vulnerabilities.map((option, index) => (
                      <span 
                      className="red-hover" 
                      key={option} 
                      onClick={() => handleRemove("vulnerabilities", option)}
                      id="vulnerabilities-display">
                        {(formData.vulnerabilities.length !== 0 && index !== formData.vulnerabilities.length-1) ? option + ", " : option}
                      </span>
                    ))}
                  </div>
                : null }
                <select className="form-control" 
                  subtype="vulnerabilities"
                  name="array"
                  onChange={handleChange}
                  id="vulnerabilities"
                  defaultValue={'default'}>
                  <option value='default' disabled>Please select</option>
                  {damageTypes.map((option, _) => (
                    (formData.vulnerabilities && formData.vulnerabilities.includes(option)) ?
                      <option disabled key={option}>{option}</option>
                    :
                      <option key={option}>{option}</option>
                    ))}
                  <option id="other_vulnerabilities_option" key="Other">Other</option>
                </select>
                {document.getElementById('other_vulnerabilities_option') && document.getElementById('other_vulnerabilities_option').selected ?
                  <div className="three-one-row">
                    <input className="form-control" 
                      subtype="vulnerabilities"
                      id="other_vulnerabilities_field"
                      placeholder="Please Enter a Vulnerability">
                    </input>
                    <Button onClick={()=>addOther("vulnerabilities",$("#other_vulnerabilities_field"))}> Add </Button>
                  </div>
                : null }
              </div>

              <div className="auto-column">
                <label className="font-weight-bold">Damage Immunities: </label>
                {formData.immunities ? 
                  <div >
                    {formData.immunities.map((option, index) => (
                      <span 
                      className="red-hover" 
                      key={option} 
                      onClick={() => handleRemove("immunities",option)}
                      id="immunities-display">
                        {(formData.immunities.length !== 0 && index !== formData.immunities.length-1) ? option + ", " : option}
                      </span>
                    ))}
                  </div>
                : null }
                <select className="form-control" 
                  subtype="immunities"
                  name="array"
                  onChange={handleChange}
                  id="immunities"
                  defaultValue={'default'}>
                  <option value='default' disabled>Please select</option>
                  {damageTypes.map((option, _) => (
                    (formData.immunities && formData.immunities.includes(option)) ?
                      <option disabled key={option}>{option}</option>
                    :
                      <option key={option}>{option}</option>
                    ))}
                  <option id="other_immunities_option" key="Other">Other</option>
                </select>
                {document.getElementById('other_immunities_option') && document.getElementById('other_immunities_option').selected ?
                  <div className="three-one-row">
                    <input className="form-control" 
                      subtype="immunities"
                      id="other_immunities_field"
                      placeholder="Please Enter an Immunity">
                    </input>
                    <Button onClick={()=>addOther("immunities",$("#other_immunities_field"))}> Add </Button>
                  </div>
                : null }
              </div>

              <div className="auto-column">
                <label className="font-weight-bold">Damage Resistances: </label>
                {formData.resistances ? 
                  <div >
                    {formData.resistances.map((option, index) => (
                      <span 
                      className="red-hover" 
                      key={option} 
                      onClick={() => handleRemove("resistances",option)}
                      id="resistances-display">
                        {(formData.resistances.length !== 0 && index !== formData.resistances.length-1) ? option + ", " : option}
                      </span>
                    ))}
                  </div>
                : null }
                <select className="form-control" 
                  subtype="resistances"
                  name="array"
                  onChange={handleChange}
                  id="resistances"
                  defaultValue={'default'}>
                  <option value='default' disabled>Please select</option>
                  {damageTypes.map((option, _) => (
                    (formData.resistances && formData.resistances.includes(option)) ?
                      <option disabled key={option}>{option}</option>
                    :
                      <option key={option}>{option}</option>
                    ))}
                  <option id="other_resistances_option" key="Other">Other</option>
                </select>
                {document.getElementById('other_resistances_option') && document.getElementById('other_resistances_option').selected ?
                  <div className="three-one-row">
                    <input className="form-control" 
                      subtype="resistances"
                      id="other_resistances_field"
                      placeholder="Please Enter a Vulnerability">
                    </input>
                    <Button onClick={()=>addOther("resistances",$("#other_resistances_field"))}> Add </Button>
                  </div>
                : null }
              </div>

              <div className="auto-column">
                <label className="font-weight-bold">Condition Immunities: </label>
                {formData.condition_immunities ? 
                  <div >
                    {formData.condition_immunities.map((option, index) => (
                      <span 
                      className="red-hover" 
                      key={option} 
                      onClick={() => handleRemove("condition_immunities",option)}
                      id="condition_immunities-display">
                        {(formData.condition_immunities.length !== 0 && index !== formData.condition_immunities.length-1) ? option + ", " : option}
                      </span>
                    ))}
                  </div>
                : null }
                <select className="form-control" 
                  subtype="condition_immunities"
                  name="array"
                  onChange={handleChange}
                  id="condition_immunities"
                  defaultValue={'default'}>
                  <option value='default' disabled>Please select</option>
                  {conditionTypes.map((option, _) => (
                    (formData.condition_immunities && formData.condition_immunities.includes(option)) ?
                      <option disabled key={option}>{option}</option>
                    :
                      <option key={option}>{option}</option>
                    ))}
                  <option id="other_condition_immunities_option" key="Other">Other</option>
                </select>
                {document.getElementById('other_condition_immunities_option') && document.getElementById('other_condition_immunities_option').selected ?
                  <div className="three-one-row">
                    <input className="form-control" 
                      subtype="condition_immunities"
                      id="other_condition_immunities_field"
                      placeholder="Please Enter a Condition Immunities">
                    </input>
                    <Button onClick={()=>addOther("condition_immunities",$("#other_condition_immunities_field"))}> Add </Button>
                  </div>
                : null }
              </div>


          </div>

          <div className="auto-row">
            <div className="auto-column">
              <Form.Group>
                <Form.Label className="font-weight-bold" >Traits:</Form.Label> <br></br>
                {formData.traits ? formData.traits.map((option, _) => (
                  <div key = {option.name} className="red-hover" onClick={()=>removeTrait(option)}>
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

          <div className="auto-row">
            <div className="auto-column">
              <Form.Group>
                <Form.Label className="font-weight-bold" >Actions:</Form.Label> <br></br>
                {formData.actions ? formData.actions.map((option, _) => (
                  <div key = {option.name} className="red-hover" onClick={()=>handleRemove("actions",option)}>
                    <span className="font-weight-bold">{option.name}: </span>
                    <span className="font-italic">{option.legendary ? " (Legendary) " : ' '}</span>
                    <span className="font-italic">{option.reaction ? " (Reaction) " : ' '}</span>
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
                    id="action_name"
                    name="actions"
                    subtype="name" /> 
                  <Form.Control 
                    type="text" 
                    placeholder="" 
                    id="action_description"
                    name="actions"
                    subtype="description" />
                  <Button onClick={()=>addAction()}>Add</Button>
                </div>
                <div className="auto-row-left">
                  <Form.Check 
                    type="checkbox"
                    id="action_legendary"
                    label={`Legendary`}
                  />
                <Form.Check 
                    type="checkbox"
                    id="action_reaction"
                    label={`Reaction`}
                  />
                </div>
              </Form.Group>
            </div>
          </div>

          <div className="auto-row">
            <Form.Group>
              <Form.Label className="font-weight-bold">Tags:</Form.Label>
              <div>
                {formData.tags ? formData.tags.sort().map((option, index) => (
                      <span 
                      className="red-hover" 
                      key={option} 
                      onClick={() => handleRemove("tags",option)}
                      id="tags-display">
                        {(formData.tags.length !== 0 && index !== formData.tags.length-1) ? option + ", " : option}
                      </span>
                    )) : ""}
              </div>
              <div className="three-one-row">
                <Form.Control 
                  type="text" 
                  placeholder="" 
                  id="tags"
                  name="array"
                  subtype="tags"/>
                <Button onClick={()=>addTagForm()}>Add</Button>
              </div>
              <div>Common Tags: {' '}
              {commonTags.sort().map((option,index) =>(
                <span key={option} className="blue-hover font-italic" onClick={()=>addTag(option)}>{option}
                {(index !== commonTags.length-1) ? 
                 ", " : ""}
                </span>
              ))}
              </div>
            </Form.Group>
            
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