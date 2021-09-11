import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import InfoPanel from "./components/InfoPanel";
import Search from "./components/Search";
import { connect } from "react-redux";
import "./App.css";
import "./loader.css";
import { setData, setLoading, setCurrentPage } from "./Redux/redux-reducers";
import Select from "./components/Select";

const App = (props) => {
  const { data, loading, searchWord, selectValue, currentPage } = props;
  const [postsPerPage] = useState(20);

  useEffect(() => {
    const fetchPosts = async () => {
      props.setLoading(true);
      const res = await axios.get(
        "https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json"
      );
      props.setData(res.data);
      props.setLoading(false);
    };
    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = pageNumber => props.setCurrentPage(pageNumber);
  function prepareData(){
    let result = data;
    if (searchWord){
      props.setCurrentPage(1);
      result = result.filter(post => post.firstName.toLowerCase().includes(searchWord) || post.lastName.toLowerCase().includes(searchWord));
    }
    if (selectValue){
      props.setCurrentPage(1);
      result = selectValue !== 'none' && result.filter(post => post.adress.state === selectValue);
    }
    return result;
  }
  console.log(prepareData());

  return (
    loading ? <div className="spinner-1"></div> : (
    <div>
      <div className="header">
         <Search />
         <Select />
      </div>
      <Posts posts={prepareData().slice(indexOfFirstPost, indexOfLastPost)} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={prepareData().length}
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
  currentPage: state.currentPage,
});

export default connect(mapStateToProps, { setData, setLoading, setCurrentPage })(App);
