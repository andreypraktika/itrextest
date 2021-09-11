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

const App = (props) => {
  const { data, loading, searchWord, selectValue} = props;
  const [currentPage, setCurrentPage] = useState(1);
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

  const paginate = pageNumber => setCurrentPage(pageNumber);
  function prepareData(){
    let result = data;
    if (searchWord){
      result = result.filter(post => post.firstName.toLowerCase().includes(searchWord));
    }
    if (selectValue){
      result = selectValue !== 'none' && result.filter(post => post.adress.state === selectValue);
    }

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
});

export default connect(mapStateToProps, { setData, setLoading })(App);
