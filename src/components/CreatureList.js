import React, { useState, useEffect } from "react";
import CreatureDataService from "../services/CreatureService";
import creatureData from "../data/creatureData";
import { SearchBar, CreatureInfo } from "./"
import { Container, List, ListItem, ListItemTitle, ListItemDes } from "../styles/listStyles.js"
import { Button, ButtonNeg, Title } from "../styles/theme";
import * as srdData from "../data/srd.json"

const CreatureList = () => {
  const [Creatures, setCreatures] = useState([]);
  const [currentCreature, setCurrentCreature] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

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

  function addTestGuy(i) {
    const spider = creatureData[i]
    console.log("spid" + spider)
    CreatureDataService.create(spider)
    .catch(e => {
        console.log(e);
    }).then(
    );
  }

  function addGuy(guy) {
  CreatureDataService.create(guy)
        .catch(e => {
            console.log(e);
        }).then(
        );
  }

  function addAllFromFile() {
    console.log("loading")
    srdData.default.forEach(addGuy)
    console.log("done")
    refreshList()
  }

  return (
    <Container>
      <Button
        onClick={() => addAllFromFile()}
      >
        add all srd (takes a min, will not create duplicates)
      </Button>
      <ButtonNeg    
          onClick={removeAllCreatures}
        >
          Remove All
        </ButtonNeg>
      <SearchBar setCreatures={setCreatures} />
      <div >
        <Title>Creatures List ({Creatures.length})</Title>
        <List >
          {Creatures &&
            Creatures.map((Creature, index) => (
              <ListItem
                key={index}
              >
                <ListItemTitle
                  onClick={() => setActiveCreature(Creature, index)}
                >
                  {Creature.name}
                </ListItemTitle>
                <div style={{gridArea:"cr"}}>
                {Creature.challenge_rating}
                </div>
                <ListItemDes style={{gridArea:"description"}}>
                {Creature.size} {Creature.type} {Creature.subtype} : {Creature.alignment}
                  </ListItemDes>
                <ButtonNeg
                  onClick={() => removeCreature(Creature._id)}>
                  Delete Me
                </ButtonNeg>
              </ListItem>
            ))}
        </List >

      </div>
        {currentCreature ? (
          <CreatureInfo currentCreature={currentCreature} />
        ) : (
          <div>
            <br />
            <p>Please click on a Creature...</p>
          </div>
        )}
    </ Container>
  );
};

export default CreatureList;