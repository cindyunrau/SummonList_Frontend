import React, { useState, useEffect } from "react";
import CreatureDataService from "../services/CreatureService";

import { SearchBar, CreatureInfo } from "./"

import styled from 'styled-components'

const Container = styled.div`

`
const Title = styled.h4`
  margin-top: 1em;
  margin-bottom: 1em;
`
const ListItem = styled.li`
  margin-top: -1px;
  border: 1px solid;
  padding: 10px;
`
const List = styled.ul`
  list-style-type: none;
  margin:0;
  padding:0;
`
const RemoveAll = styled.button`
margin-top: 1em;
margin-bottom: 1em;
`
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

  const setActiveCreature = (Creature, index) => {
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



  return (
    <Container>
      <SearchBar setCreatures={setCreatures} />
      <div >
        <Title>Creatures List</Title>
        <List >
          {Creatures &&
            Creatures.map((Creature, index) => (
              <ListItem
                onClick={() => setActiveCreature(Creature, index)}
                key={index}
              >
                {Creature.name}
              </ListItem>
            ))}
        </List >
        <RemoveAll    
          onClick={removeAllCreatures}
        >
          Remove All
        </RemoveAll>
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