import styled from 'styled-components'

export const theme = {
    colours: {
        primary: "#84a59d", // blue-green
        secondary: "#f28482", //salmon-ish
        tertiary: "#f6bd60", //yellow
        lightPink: "#f5cac3",
        ligherPink: "#f7ede2",
        white: "#ffffff",
        black: "#12100E",
        negative: "#F24333" 
    }
    
}

export const Title = styled.h4`
  margin-top: 1em;
  margin-bottom: 1em;
`

export const Button = styled.button`
    background-color: ${theme.colours.primary};
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
`

export const ButtonNeg = styled(Button)`
    background-color: ${theme.colours.negative};
`
