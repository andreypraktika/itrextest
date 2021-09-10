import React from "react";
import { connect } from "react-redux";
import { setSearchWord } from '../Redux/redux-reducers'
import "../App.css";

function Search(props){
    const handleChange = e => {
        props.setSearchWord(e.target.value);
    }
    return (
        <input type="text" placeholder="Search by name" onChange={handleChange}/>
    )
}

const mapStateToProps = (state) => ({
    searchWord: state.searchWord,
  });
  
export default connect(mapStateToProps, { setSearchWord })(Search);