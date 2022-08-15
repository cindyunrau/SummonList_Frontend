import React, { useState, useEffect } from "react";
import CreatureDataService from "../services/CreatureService";
import { SearchBar, CreatureInfo } from "./";
import { Container, List, ListItem, ListItemTitle, ListItemDes } from "../styles/listStyles.js";
import { Button, ButtonNeg, Title, Loading } from "../styles/theme";
import * as srdData from "../data/srd.json";


const CreatureList = () => {
  const [Creatures, setCreatures] = useState([]);
  const [currentCreature, setCurrentCreature] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");

  useEffect(() => {
    retrieveCreatures();
  }, []);

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

  const setActiveCreature = (Creature, index, e) => {
    if(Creature === currentCreature){
      refreshList();
      return;
    }
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
    <Container>
      <div>
        <Button
          onClick={() => addAllFromFile()}
          style={{float:"left"}}
        >
          add all srd (takes a min, will not create duplicates)
        </Button>
        {loading ? <Loading style={{float:"left"}}></Loading>
        : null
        }
        <br clear="all" />
        <div onClick={removeAllCreatures}>
          <ButtonNeg    
              
              style={{display:"block", float:"left"}}
            >
          </ButtonNeg>
          <strong style={{margin:"0.5rem"}}>Remove All</strong>
        </div>
      </div>
      <SearchBar setCreatures={setCreatures} />
      <div >
        <Title>Creatures List ({Creatures.length})</Title>
        <List >
          {Creatures.length !== 0 ? (
            <ListItem>
              <ListItemTitle onClick={() => sortAlphaName(Creatures)}>
              <strong>Name</strong>
                {sort !== "alphaNormal" ? " ˄" : " ˅"}
              </ListItemTitle>
              <div style={{gridArea:"cr"}} onClick={() => sortCR(Creatures)}>
              <strong>CR</strong>
                {sort !== "crNormal" ? " ˄" : " ˅"} 
              </div>
              <ListItemDes style={{gridArea:"description"}}>
                <strong>Description</strong>
              </ListItemDes>
            </ListItem>)
          : <p> No Creatures </p>
          }
          
          {Creatures &&
            Creatures.map((Creature, index) => (
              <>
                <ListItem
                  
                >
                  <ListItemTitle
                    onClick={() => setActiveCreature(Creature, index)}
                  >
                    {Creature.name}
                  </ListItemTitle>
                  <div style={{gridArea:"cr"}}>
                  {toFraction(Creature.challenge_rating)}
                  </div>
                  <ListItemDes style={{gridArea:"description"}}>
                  {Creature.size} {Creature.type} {Creature.subtype} : {Creature.alignment}
                    </ListItemDes>
                  <ButtonNeg
                    onClick={() => removeCreature(Creature._id)}>
                  </ButtonNeg>
                </ListItem>
                {
                  Creature == currentCreature ? 
                    <CreatureInfo currentCreature={currentCreature}>
                    </CreatureInfo> 
                    : null
                }
                
              </>
            ))}
        </List >

      </div>
    </ Container>
  );
};

export default CreatureList;