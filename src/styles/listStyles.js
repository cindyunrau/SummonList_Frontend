import styled from 'styled-components'

export const Container = styled.div`
`

export const List = styled.ul`
  list-style-type: none;
  margin:0;
  padding:0;
`

export const ListItem = styled.li`
  margin-top: -1px;
  border: 1px solid;
  padding: 10px;
  display:grid;
  grid-template-columns: 4fr 1fr 10fr 1.8rem;
  grid-template-rows: 1fr;
  grid-template-areas:
    "title cr description button";
`
export const ItemInfo = styled.li`
  margin-top: -1px;
  border: 1px solid;
  padding: 10px;
`
export const ListItemTitle = styled.div`
  grid-area: title;
`
export const ListItemDes = styled.div`
  grid-area: description;
`
