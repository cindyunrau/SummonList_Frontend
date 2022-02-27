import React, { useState } from "react";
import CreatureDataService from "../services/CreatureService";
import styled from 'styled-components';
import { Button } from './';

const Container = styled.div`
    display:grid;
    grid-template-columns: 8fr 1fr;
    grid-template-areas:
        "search button";
    column-gap: 1em;  
`
const Search = styled.input`
    grid-area: search;
`
const Submit = styled.button`
    grid-area: button;
`

const SearchBar = ({setCreatures}) => {
    const [searchName, setSearchName] = useState("");

    const findByName = () => {
        CreatureDataService.findByName(searchName)
          .then(response => {
            setCreatures(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

      const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
      };
    return (
        <Container>
            <Search
                type="text"
                placeholder="Search by Name"
                value={searchName}
                onChange={onChangeSearchName}
            />
            <Submit
                type="button"
                onClick={findByName}
            >
                Search
            </Submit>
        </Container>
    );
};

export default SearchBar;

