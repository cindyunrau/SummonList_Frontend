import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import CreatureDataService from "../services/CreatureService";

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

    const armor_class = () => {
        var string = "";
        var obj = currentCreature.armor_class;
        if(obj){
           string += obj.value;
            if(obj.description || obj.shield){
                string += " ("
                if(obj.description){
                    string += obj.description
                }
                if(obj.description && obj.shield){
                    string += ", "
                }
                if(obj.shield){
                    string += "Shield"
                }
                string += ")"
            }
        }
        return string
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

    const saving_throws = () => {
        var string = "";
        var obj = currentCreature.saving_throws
        for(const saving_throw in obj) {
            if(obj[saving_throw]){
                if(string !== ""){
                    string += ", "
                }
                if(obj[saving_throw]<0){
                    string += (saving_throw + " " + obj[saving_throw])
                } else {
                    string += (saving_throw + " +" + obj[saving_throw])
                }
            } 
        };
        return string;
    }

    const skills = () => {
        var string = "";
        var obj = currentCreature.skills
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
                if(sense !== "Passive Perception"){
                    string += "ft."
                }
            } 
        };
        return string;
    }

    const displayArray = (category) => {
        var string = "";
        var obj = currentCreature[category]
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
                if(obj[i].reaction){
                    string += "<strong>" + obj[i].name + ". </strong><i> (Reaction)</i> " + obj[i].description
                } else {
                    string += "<strong>" + obj[i].name + ". </strong>" + obj[i].description   
                } 
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
                if(obj[i].reaction){
                    string += "<strong>" + obj[i].name + ". </strong><i> (Reaction)</i> " + obj[i].description
                } else {
                    string += "<strong>" + obj[i].name + ". </strong>" + obj[i].description   
                }             }
        };
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
        <div>
            {currentCreature.source ? 
            <TextStat>
                <Label>Source:</Label>{" "}
                {currentCreature.source}
            </TextStat>
            : null}
            
            {currentCreature.armor_class ? 
                <TextStat>
                    <Label>Armor Class:</Label>{" "}
                    {armor_class()}
                </TextStat>    
            : null}
            
            {currentCreature.hit_points ? 
                <TextStat>
                    <Label>Hit Points:</Label>{" "}
                    {currentCreature.hit_points.max + (currentCreature.hit_points.dice ? " (" + currentCreature.hit_points.dice.count + "d" + currentCreature.hit_points.dice.sides + "+" + currentCreature.hit_points.dice.mod + ")" : "") }
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

            {currentCreature.saving_throws && saving_throws() !== "" ? 
                <TextStat>
                    <Label>Saving Throws:</Label>{" "}
                    {saving_throws()}
                </TextStat>
            : null }

            {currentCreature.skills ? 
            <TextStat>
                <Label>Skills:</Label>{" "}
                {skills()}
            </TextStat>
            : null }

            {currentCreature.senses && Object.keys(currentCreature.senses).length > 0 ? 
            <TextStat>
                <Label>Senses:</Label>{" "}
                {senses()}
            </TextStat>
            : null }

            {currentCreature.languages && currentCreature.languages.length > 0? 
            <TextStat>
                <Label>Languages:</Label>{" "}
                {displayArray("languages")}
            </TextStat>
            : null }

            {currentCreature.vulnerabilities ? 
            <TextStat>
                <Label>Damage Vulnerabilities:</Label>{" "}
                {displayArray("vulnerabilities")}
            </TextStat>
            : null }

            {currentCreature.resistances ? 
            <TextStat>
                <Label>Damage Resistances:</Label>{" "}
                {displayArray("resistances")}
            </TextStat>
            : null }

            {currentCreature.immunities ? 
            <TextStat>
                <Label>Damage Immunities:</Label>{" "}
                {displayArray("immunities")}
            </TextStat>
            : null }

            {currentCreature.condition_immunities ? 
            <TextStat>
                <Label>Condition Immunities:</Label>{" "}
                {displayArray("condition_immunities")}
            </TextStat>
            : null }

            {currentCreature.traits && Object.keys(currentCreature.traits).length > 0 ? 
            <TextStat>
                <hr></hr>
                <div dangerouslySetInnerHTML={{__html: traits()}}></div>
            </TextStat>
            : null }

            {currentCreature.actions && Object.keys(currentCreature.actions).length > 0  ? 
            <TextStat>
                <hr></hr>
                <h5>Actions:</h5>{" "}
                <div dangerouslySetInnerHTML={{__html: actions()}}></div>
            </TextStat>
            : null }

            {legActions() !== "" ? 
            <TextStat>
                <hr></hr>
                <h5>Legendary Actions:</h5>{" "}
                <div dangerouslySetInnerHTML={{__html: legActions()}}></div>
            </TextStat>
            : null }

            {currentCreature.tags && Object.keys(currentCreature.tags).length > 0 ? 
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
        </div>
    );
};

export default CreatureInfo;