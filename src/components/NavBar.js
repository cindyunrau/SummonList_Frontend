import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components'
import CreatureDataService from "../services/CreatureService";


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

const Test = styled.div`
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


const Image = styled.img`
    width: 50px;
    filter: invert(100%);
    animation: blink 4.8s infinite;
    -webkit-animation-delay: 15s;
    -moz-animation-delay: 15s;
    -ms-animation-delay: 15s;
    -o-animation-delay: 15s;
    animation-delay: 15s;
`


function NavBar() {
    return (
        <NavContainer>
            <NavItem to={"/creatures"}>
                <Image src="eye.png"></Image>
            </NavItem>
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