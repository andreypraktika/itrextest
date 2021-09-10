import React from "react";
import { connect } from "react-redux";
import "../App.css";
import { setSelectValue } from "../Redux/redux-reducers";

function Search(props){
    const { data } = props;
    function setValues(){
        const values = new Set();
        values.add(data.map(post => post.adress.state));
        return values;
    }
    const handleChange = e => {
        props.setSelectValue(e.target.value);
    }
    return (
        <select onChange={handleChange}>
            <option value="" hidden disabled selected>Filter By State</option>
            <option value="" >None</option>
            {Array.from(setValues()).map(value => value.map(el => <option>{el}</option>))}
        </select>
    )
}

const mapStateToProps = (state) => ({
    data: state.data,
  });
  
export default connect(mapStateToProps, { setSelectValue })(Search);