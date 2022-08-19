import React, { useState, useEffect } from "react";
import CreatureDataService from "../services/CreatureService";
import { SearchBar, CreatureInfo } from "./";
import { Title } from "../styles/theme";
import Button from 'react-bootstrap/Button';
import Accordian from 'react-bootstrap/Accordion';
import * as srdData from "../data/srd.json";

const CreatureList = () => {
  const [Creatures, setCreatures] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    retrieveCreatures();
  }, []);

  const retrieveCreatures = () => {
    CreatureDataService.getAll()
      .then(response => {
        setCreatures(defaultSort(response.data));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCreatures();
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

  const removeCreature = (id) => {
    CreatureDataService.remove(id)
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  function addGuy(guy) {
    guy.source = "srd"
    guy.tags.push("srd")
    CreatureDataService.create(guy)
        .catch(e => {
            console.log(e);
        }).then(
        );
  }

  async function addAllFromFile() {
    var promises = srdData.default.map(async (element)=> {
      addGuy(element);
      return new Promise((res, rej) => {res()})
    });
    Promise.all(promises)
    .then((results) => {
      console.log("done");
      refreshList();
    })

  }

  function defaultSort(list){
    return sortCRInc(list);
  }

  function sortAlphaName(list){
    var newList;
    if (sort !== "alphaNormal"){
      newList = sortAlphaNameInc(list);
    } else {
      newList = sortAlphaNameDec(list);
    }
    setCreatures(newList)
  }

  function sortAlphaNameInc(list) {
    var newList = list.slice(0).sort(function(a, b)
    {
     var x = a.name; 
     var y = b.name;
     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    setSort("alphaNormal")
    return newList;
  }

  function sortAlphaNameDec(list) {
    var newList = list.slice(0).sort(function(a, b)
    {
     var x = a.name; 
     var y = b.name;
     return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
    setSort("alphaReverse")
    return newList;
  }

  function sortCR(list){
    var newList;
    if (sort !== "crNormal"){
      newList = sortCRInc(list);
    } else {
      newList = sortCRDec(list);
    }
    setCreatures(newList)
  }

  function sortCRInc(list) {
    var newList = list.slice(0).sort(function(a, b)
    {
     var x = a.challenge_rating; 
     var y = b.challenge_rating;
     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    setSort("crNormal")
    return newList;
  }

  function sortCRDec(list) {
    var newList = list.slice(0).sort(function(a, b)
    {
     var x = a.challenge_rating; 
     var y = b.challenge_rating;
     return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
    setSort("crReverse")
    return newList;
  }

  function toFraction(number){
    switch(number){
      case 0.125:
        return "1/8"
      case 0.25:
        return "1/4"
      case 0.5:
        return "1/2"
      default:
        return number
    }
  }

  return (
    <div>
      
      <Button
        onClick={() => addAllFromFile()}
      >
        TEMP BUTTON: Add all srd (takes a min, will not create duplicates)
      </Button>
      <br></br><br></br>
      <Button onClick={removeAllCreatures}> TEMP BUTTON: Remove All</Button>
      <br></br><br></br>
      <SearchBar setCreatures={setCreatures} />

      <div >
        <Title>Creatures List ({Creatures.length})</Title>
        
        
          {Creatures.length !== 0 ? 
            <div className="auto-row list-row temp">
              <div className="pointer" onClick={() => sortAlphaName(Creatures)}><strong >Name{sort !== "alphaNormal" ? " ˄" : " ˅"}</strong></div>
              <div className="pointer" onClick={() => sortCR(Creatures)}><strong >CR{sort !== "crNormal" ? " ˄" : " ˅"}</strong></div>
              <div><strong>Description</strong></div>
              <div></div>
            </div>            
          : <p> No Creatures </p>
          }

          {Creatures &&
            Creatures.map((Creature) => (
              <Accordian defaultActiveKey="0" key={Creature.name}>
                <Accordian.Item eventKey={Creature._id}>
                  <Accordian.Header >
                    <div className="auto-row list-row">
                      <div>{Creature.name}</div>
                      <div>{toFraction(Creature.challenge_rating)}</div>
                      <div>{Creature.size} {Creature.type}{Creature.subtype ? ", " + Creature.subtype : " "} : {Creature.alignment}</div>

                    </div>
                  </Accordian.Header>
                  <Accordian.Body>
                    {(Object.keys(Creature).length > 6) ? 
                        <CreatureInfo currentCreature={Creature}></CreatureInfo> 
                        : <div> This Creature has no additional Content </div>
                    }
                    <div className="auto-row-right">
                      <Button onClick={() => removeCreature(Creature._id)}> x </Button>
                    </div>
                    
                  </Accordian.Body>
                </Accordian.Item>
              </Accordian>
            ))}

      </div>
    </ div>
  );
};

export default CreatureList;