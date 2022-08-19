import React, { useState } from "react";
import CreatureDataService from "../services/CreatureService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchBar = ({setCreatures}) => {
    const [searchName, setSearchName] = useState("");

    const findByName = () => {
        if(searchName === ""){
            CreatureDataService.getAll()
            .then(response => {
              console.log(response.data);
              setCreatures(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        } else {
            CreatureDataService.findByName(searchName)
            .then(response => {
                console.log(response.data);
                setCreatures(response.data);
                
            })
            .catch(e => {
                console.log(e);
            });
        }
        
      };

      const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
      };
    return (
        <Form.Group className="three-one-row">
            <Form.Control
                type="text"
                placeholder="Search by Name"
                value={searchName}
                onChange={onChangeSearchName}
                onKeyPress={event => {
                    if (event.key === "Enter") {
                        findByName();
                    }
                  }}
            />
            <Button
                type="button"
                onClick={findByName}
            >
                Search
            </Button>
        </Form.Group>
    );
};

export default SearchBar;

