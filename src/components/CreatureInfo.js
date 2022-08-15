import styled from 'styled-components';
import { ItemInfo } from "../styles/listStyles"
import { Link } from "react-router-dom"

const Container = styled.div`
    width:500px;
`
const Row = styled.div`
    display:grid;
    grid-auto-flow: column;
`
const AbilityStat = styled.div`
    padding:0;
    margin:0;
    text-align:center;
`
const TextStat = styled.div`
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
const Tag = styled.div`
    background.color: red;
`

const CreatureInfo = ({ currentCreature }) => {
    const abilityMod = (ability) => {
        const modifier = Math.floor((ability-10)/2);
        if(modifier<0){
            return modifier;
        }
        return "+" + modifier;
    }

    const speed = () => {
        var string = "";
        var obj = currentCreature.speed
        for(const speed in obj) {
            if(obj[speed]){
                if(string != ""){
                    string += ", "
                }
                string += (speed + " " + obj[speed] + "ft.")
            } 
        };
        return string;
    }

    const skills = () => {
        var string = "";
        var obj = currentCreature.properties
        for(const skill in obj) {
            if(obj[skill]){
                if(string != ""){
                    string += ", "
                }
                if(obj[skill]<0){
                    string += (skill + " " + obj[skill])
                } else {
                    string += (skill + " +" + obj[skill])
                }
            } 
        };
        return string;
    }

    const senses = () => {
        var string = "";
        var obj = currentCreature.senses
        for(const sense in obj) {
            if(obj[sense]){
                if(string != ""){
                    string += ", "
                }
                string += (sense + " " + obj[sense])
            } 
        };
        return string;
    }

    const languages = () => {
        var string = "";
        var obj = currentCreature.languages
        for(const i in obj) {
            if(string != ""){
                string += ", "
            }
            string += (obj[i])
        };
        return string;
    }

    const traits = () => {
        var string = "";
        var obj = currentCreature.traits
        for(const i in obj) {
            if(string != ""){
                string += "<br />"
            }
            string += "<strong>" + obj[i].name + ". </strong>" + obj[i].description 
        };
        return string;
    }

    const actions = () => {
        var string = "";
        var obj = currentCreature.actions
        for(const i in obj) {
            if(!obj[i].legendary){
                if(string != ""){
                string += "<br />"
                }
                string += "<strong>" + obj[i].name + ". </strong>" + obj[i].description 
            }
        };
        return string;
    }

    const legActions = () => {
        var string = "";
        var obj = currentCreature.actions
        for(const i in obj) {
            if(obj[i].legendary){
                if(string != ""){
                string += "<br />"
                }
                string += "<strong>" + obj[i].name + ". </strong>" + obj[i].description 
            }
        };
        return string;
    }

    const tags = () => {
        var string = "";
        var obj = currentCreature.tags
        for(const i in obj) {
            string += "<i>"+obj[i] + "</i> "
        };
        return string;
    }

    return (
        <ItemInfo>
            <TextStat>
                <Label>Source:</Label>{" "}
                {currentCreature.base ? "Original" : "Imported"}
            </TextStat>
            <TextStat>
                <Label>Armor Class:</Label>{" "}
                {currentCreature.armor_class.value} ({currentCreature.armor_class.description})
            </TextStat>
            <TextStat>
                <Label>Hit Points:</Label>{" "}
                {currentCreature.hit_points.max} ({currentCreature.hit_points.dice[0].count}d{currentCreature.hit_points.dice[0].sides}+{currentCreature.hit_points.dice[0].mod})
            </TextStat>
            <TextStat>
                <Label>Speed:</Label>{" "}
                {speed()}
            </TextStat>
            <Row>
                <AbilityStat>
                    <AbilityLabel>STR:</AbilityLabel>
                    {currentCreature.ability_scores.str + " (" + abilityMod(currentCreature.ability_scores.str) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>DEX:</AbilityLabel>
                    {currentCreature.ability_scores.dex + " (" + abilityMod(currentCreature.ability_scores.dex) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>CON:</AbilityLabel>
                    {currentCreature.ability_scores.con + " (" + abilityMod(currentCreature.ability_scores.con) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>INT:</AbilityLabel>
                    {currentCreature.ability_scores.int + " (" + abilityMod(currentCreature.ability_scores.int) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>WIS:</AbilityLabel>
                    {currentCreature.ability_scores.wis + " (" + abilityMod(currentCreature.ability_scores.wis) + ")"}
                </AbilityStat>
                <AbilityStat>
                    <AbilityLabel>CHA:</AbilityLabel>
                    {currentCreature.ability_scores.cha + " (" + abilityMod(currentCreature.ability_scores.cha) + ")"}
                </AbilityStat>
            </Row>
            <TextStat>
                <Label>Skills:</Label>{" "}
                {skills()}
            </TextStat>
            <TextStat>
                <Label>Senses:</Label>{" "}
                {senses()}
            </TextStat>
            <TextStat>
                <Label>Languages:</Label>{" "}
                {languages()}
            </TextStat>
            <TextStat>
                <hr></hr>
                <div dangerouslySetInnerHTML={{__html: traits()}}></div>
            </TextStat>
            <TextStat>
                <hr></hr>
                <h5>Actions:</h5>{" "}
                <div dangerouslySetInnerHTML={{__html: actions()}}></div>
            </TextStat>
            <TextStat>
                <hr></hr>
                <h5>Legendary Actions:</h5>{" "}
                <div dangerouslySetInnerHTML={{__html: legActions()}}></div>
            </TextStat>
            <TextStat>
                <hr></hr>
                <div dangerouslySetInnerHTML={{__html: tags()}}></div>
            </TextStat>

            {/* <Link
              to={"/Creatures/" + currentCreature.id}
            >
              Edit
            </Link>  */}
        </ItemInfo>
    );
};

export default CreatureInfo;