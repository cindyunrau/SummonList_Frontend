import styled from 'styled-components';
import { ItemInfo } from "../styles/listStyles"
import { Link } from "react-router-dom"

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
            if(obj[speed] || obj[speed] === 0){
                if(string !== ""){
                    string += ", "
                }
                if(speed === "Walk"){
                string += (obj[speed] + "ft.") 
                } else {
                  string += (speed + " " + obj[speed] + "ft.")  
                }
            }
        };
        return string;
    }

    const skills = () => {
        var string = "";
        var obj = currentCreature.properties
        for(const skill in obj) {
            if(obj[skill]){
                if(string !== ""){
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
                if(string !== ""){
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
            if(string !== ""){
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
            if(string !== ""){
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
                if(string !== ""){
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
                if(string !== ""){
                string += "<br />"
                }
                string += "<strong>" + obj[i].name + ". </strong>" + obj[i].description 
            }
        };
        if(string !== "" && !currentCreature.tags.includes("legendary")){
            currentCreature.tags.push("legendary") // this doesn't push to database
        }
        return string;
    }

    const tags = () => {
        var string = "Tags: ";
        var obj = currentCreature.tags
        for(const i in obj) {
            if(string !== "Tags: "){
                string += ", "
            }
            string += "<i>" + obj[i] + "</i>"
        };
        return string;
    }

    return (
        <ItemInfo>
            {currentCreature.source ? 
            <TextStat>
                <Label>Source:</Label>{" "}
                {currentCreature.source}
            </TextStat>
            : null}
            
            {currentCreature.armor_class ? 
                <TextStat>
                    <Label>Armor Class:</Label>{" "}
                    {currentCreature.armor_class.value + (currentCreature.armor_class.description ? " (" + currentCreature.armor_class.description + ")" : null) }
                </TextStat>    
            : null}
            
            {currentCreature.hit_points ? 
                <TextStat>
                    <Label>Hit Points:</Label>{" "}
                    {currentCreature.hit_points.max + (currentCreature.hit_points.dice ? " (" + currentCreature.hit_points.dice.count + "d" + currentCreature.hit_points.dice.sides + "+" + currentCreature.hit_points.dice.mod + ")" : null) }
                </TextStat>    
            : null}

            {currentCreature.speed ? 
                <TextStat>
                    <Label>Speed:</Label>{" "}
                    {speed()}
                </TextStat>
            : null }

            {currentCreature.ability_scores ? 
                <Row>
                    <AbilityStat>
                        <AbilityLabel>STR:</AbilityLabel>
                        {currentCreature.ability_scores.str ? currentCreature.ability_scores.str + " (" + abilityMod(currentCreature.ability_scores.str) + ")" 
                        : "- -"}
                    </AbilityStat>
                    <AbilityStat>
                        <AbilityLabel>DEX:</AbilityLabel>
                        {currentCreature.ability_scores.dex ? currentCreature.ability_scores.dex + " (" + abilityMod(currentCreature.ability_scores.dex) + ")" 
                        : "- -"}
                    </AbilityStat>
                    <AbilityStat>
                        <AbilityLabel>CON:</AbilityLabel>
                        {currentCreature.ability_scores.con ? currentCreature.ability_scores.con + " (" + abilityMod(currentCreature.ability_scores.con) + ")" 
                        : "- -"}
                    </AbilityStat>
                    <AbilityStat>
                        <AbilityLabel>INT:</AbilityLabel>
                        {currentCreature.ability_scores.int ? currentCreature.ability_scores.int + " (" + abilityMod(currentCreature.ability_scores.int) + ")" 
                        : "- -"}
                    </AbilityStat>
                    <AbilityStat>
                        <AbilityLabel>WIS:</AbilityLabel>
                        {currentCreature.ability_scores.wis ? currentCreature.ability_scores.wis + " (" + abilityMod(currentCreature.ability_scores.wis) + ")" 
                        : "- -"}
                    </AbilityStat>
                    <AbilityStat>
                        <AbilityLabel>CHA:</AbilityLabel>
                        {currentCreature.ability_scores.cha ? currentCreature.ability_scores.cha + " (" + abilityMod(currentCreature.ability_scores.cha) + ")" 
                        : "- -"}
                    </AbilityStat>
                </Row>
            : null }

            {currentCreature.properties ? 
            <TextStat>
                <Label>Skills:</Label>{" "}
                {skills()}
            </TextStat>
            : null }

            {currentCreature.senses ? 
            <TextStat>
                <Label>Senses:</Label>{" "}
                {senses()}
            </TextStat>
            : null }

            {currentCreature.languages ? 
            <TextStat>
                <Label>Languages:</Label>{" "}
                {languages()}
            </TextStat>
            : null }

            {currentCreature.traits ? 
            <TextStat>
                <hr></hr>
                <div dangerouslySetInnerHTML={{__html: traits()}}></div>
            </TextStat>
            : null }

            {currentCreature.actions ? 
            <TextStat>
                <hr></hr>
                <h5>Actions:</h5>{" "}
                <div dangerouslySetInnerHTML={{__html: actions()}}></div>
            </TextStat>
            : null }

            {currentCreature.actions ? 
            <TextStat>
                <hr></hr>
                <h5>Legendary Actions:</h5>{" "}
                <div dangerouslySetInnerHTML={{__html: legActions()}}></div>
            </TextStat>
            : null }

            {currentCreature.tags ? 
            <TextStat>
                <hr></hr>
                <div dangerouslySetInnerHTML={{__html: tags()}}></div>
            </TextStat>
            : null }

            {/* <Link
              to={"/Creatures/" + currentCreature.id}
            >
              Edit
            </Link>  */}
        </ItemInfo>
    );
};

export default CreatureInfo;