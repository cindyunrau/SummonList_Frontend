import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { css } from 'styled-components'

const NavContainer =  styled.nav`
    background-color: #282828;
    height: 50px;
    width: 100%;
    margin:auto;
`

const NavItem = styled(Link)`
    display: flex;
    align-items: center;
    float:left;
    padding-left: 30px;
    height: 50px;
    color: white;
    text-decoration: none;
    &:hover {
        color: grey;
    }
    
  ${props =>
    props.primary &&
    css`
      font-weight: bold;
      font-size: 1.3em;
    `};
`


function NavBar() {
    return (
        <NavContainer>
            <NavItem to={"/creatures"} primary="true">
                Summon List
            </NavItem>
            <NavItem to={"/creatures"}>
                Creatures
            </NavItem>
            <NavItem to={"/add"}>
                Add
            </NavItem>
        </NavContainer>
    )
}
export default NavBar;