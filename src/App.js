import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import InfoPanel from "./components/InfoPanel";
import Search from "./components/Search";
import { connect } from "react-redux";
import "./App.css";
import "./loader.css";
import { setData, setLoading } from "./Redux/redux-reducers";
import Select from "./components/Select";
import _ from 'lodash';

const App = (props) => {
  const { data, loading, searchWord, selectValue, tableSort } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    const fetchPosts = async () => {
      props.setLoading(true);
      const res = await axios.get(
        "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}"
      );
      props.setData(res.data);
      props.setLoading(false);
    };
    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);
  function prepareData(){
    console.log(data);
    let result = data;
    if (searchWord){
      result = result.filter(post => post.firstName.toLowerCase().includes(searchWord));
    }
    if (selectValue){
      result = selectValue !== 'none' && result.filter(post => post.adress.state === selectValue);
    }
    if (tableSort){
      result = _.orderBy(result, [tableSort],['asc']);
    };
    return result.slice(indexOfFirstPost, indexOfLastPost);
  }
  console.log(prepareData());

  return (
    loading ? <div className="spinner-1"></div> : (
    <div>
      <div className="header">
         <Search />
         <Select />
      </div>
      <Posts posts={prepareData()} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
      <InfoPanel />
    </div>)
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  loading: state.loading,
  searchWord: state.searchWord,
  selectValue: state.selectValue,
  tableSort: state.tableSort,
});

export default connect(mapStateToProps, { setData, setLoading })(App);
