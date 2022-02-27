import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components'
import Routes from './routes';

import { NavBar } from "./components"

const ContentContainer = styled.div`
  width: 1000px;
  height: 100vh;
  padding: 30px;
  margin:auto;
`


function App() {
  return (
    <>
      <NavBar />
      <ContentContainer >
      <Routes />
      </ContentContainer>
    </>
  );
}
export default App;
