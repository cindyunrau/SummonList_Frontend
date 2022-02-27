import styled, {css} from 'styled-components';
import { Link } from "react-router-dom";

const Container = styled.div`
    width:500px;
`
const AbilityBlock = styled.div`
    display:grid;
    grid-auto-flow: column;
`
const AbilityStat = styled.div`
    padding:0;
    margin:0;
    text-align:center;
    border: solid;

`
const TextStat = styled.div`
    border: solid;
`

const Title = styled.h4`
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`
const Label = styled.label`
    font-weight: bold;
    padding:0;
    margin:0;
`
const AbilityLabel = styled(Label)`
    width:100%;
    padding:0;
    margin:0;
`

const CreatureInfo = ({ currentCreature }) => {
    const abilityMod = (ability) => {
        return Math.floor((ability-10)/2)
    }

    return (
        <Container>
            <Title>Creature</Title>
            <TextStat>
                <Label>Name:</Label>{" "}
                {currentCreature.name}
            </TextStat>
            <TextStat>
                <Label>Description:</Label>{" "}
                {currentCreature.description}
            </TextStat>
            <TextStat>
                <Label>Source:</Label>{" "}
                {currentCreature.base ? "Custom" : "Original"}
            </TextStat>
            <TextStat>
                <Label>Challenge:</Label>{" "}
                {currentCreature.cr}
            </TextStat>

            <AbilityBlock>
                <AbilityStat>
                    <AbilityLabel>STR:</AbilityLabel>
                    {currentCreature.str + " (" + abilityMod(currentCreature.str) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>DEX:</AbilityLabel>
                    {currentCreature.dex + " (" + abilityMod(currentCreature.dex) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>CON:</AbilityLabel>
                    {currentCreature.con + " (" + abilityMod(currentCreature.con) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>INT:</AbilityLabel>
                    {currentCreature.int + " (" + abilityMod(currentCreature.int) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>WIS:</AbilityLabel>
                    {currentCreature.wis + " (" + abilityMod(currentCreature.wis) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>CHA:</AbilityLabel>
                    {currentCreature.cha + " (" + abilityMod(currentCreature.cha) + ")"}
                </AbilityStat>
            </AbilityBlock>

            <Link
              to={"/Creatures/" + currentCreature.id}
            >
              Edit
            </Link>
        </Container>
    );
};

export default CreatureInfo;