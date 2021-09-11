import React from "react";
import "../App.css";
import { connect } from "react-redux";

function InfoPanel(props){
    const { active } = props;
    return (
        active && (
        <div class="info">
            {active && (
            <>
            <ul>
                <p><b>Profile Info</b></p>
               <p>Selected Profile: {active.firstName} {active.lastName}</p>
               <p>Description: {active.description}</p> 
               <p>Address: {active.adress.streetAddress}</p> 
               <p>City: {active.adress.city}</p> 
               <p>State: {active.adress.state}</p> 
               <p>Index: {active.adress.zip}</p> 
            </ul>
            </>)}
        </div>)
    )
}

const mapStateToProps = (state) => ({
    active: state.active,
  });
  
export default connect(mapStateToProps)(InfoPanel);