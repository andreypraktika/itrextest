import React from "react";
import "../App.css";
import { connect } from "react-redux";

function InfoPanel(props){
    const { active } = props;
    return (
        active && (<div class="info">
            {active && (<><p>Profile Info</p><ul>
                <p>Selected Profile: {active.firstName}</p>
                <p>Description: {active.description}</p>
                {/* <p>State: {active.adress.state}</p>
                <p>Index: {active.adress.index}</p> */}
            </ul></>)}
        </div>)
    )
}

const mapStateToProps = (state) => ({
    active: state.active,
  });
  
export default connect(mapStateToProps)(InfoPanel);