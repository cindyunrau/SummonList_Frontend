import styled from 'styled-components'
import { keyframes } from 'styled-components'
import { ReactComponent as Delete } from "../images/icons/delete.svg";
import { ReactComponent as Spinner } from "../images/icons/spinner.svg";
import { ReactComponent as Plus } from "../images/icons/add.svg";

export const theme = {
    colours: {
        primary: "#404040", 
        secondary: "#808080",
        tertiary: "#b2b2b2", 
        white: "#ffffff",
        black: "#12100E",
        negative: "#404040" 
    }
    
}

export const Title = styled.h4`
  margin-top: 1em;
  margin-bottom: 1em;
`

export const Button = styled.button`
    background-color: ${theme.colours.secondary};
    color: ${theme.colours.white};
    font-weight: 400;
    text-align: center;
    border: 1px solid transparent;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    grid-area: button
    &:hover {
        opacity: 0.75
      }
      display:block;
`

export const ButtonNeg = styled(Delete)`
    fill: ${theme.colours.negative};
    width: 1.8rem;
    cursor: pointer;
`
export const Remove = styled(Delete)`
    fill: ${theme.colours.secondary};
    width: 1rem;
    cursor: pointer;
`
export const Add = styled(Plus)`
    fill: ${theme.colours.secondary};
    width: 1rem;
    cursor: pointer;
`
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`
export const Loading = styled(Spinner)`
    animation: ${spin} 4s linear infinite;
    width: 2rem;
    fill: ${theme.colours.tertiary};
`


