import React from "react";
import { connect } from 'react-redux';
import { setActive, setTableSort } from "../Redux/redux-reducers";

const Posts = (props) => {
  const { active, posts } = props;

  function handleClick(id){
    props.setActive(posts.filter(post => post.id === id)[0]);
    console.log(active);
  }
  return (
    <table class="table">
      <thead>
        <tr>
          <th id='id' onClick={e => props.setTableSort(e.target.id)}>Id</th>
          <th id='firstName' onClick={e => props.setTableSort(e.target.id)}>First Name</th>
          <th id='lastName' onClick={e => props.setTableSort(e.target.id)}>Last Name</th>
          <th id='email' onClick={e => props.setTableSort(e.target.id)}>Email</th>
          <th id='phone' onClick={e => props.setTableSort(e.target.id)}>Phone</th>
          <th id='adress.state' onClick={e => props.setTableSort(e.target.id)}>State</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id} onClick={() => handleClick(post.id)}>
            <td>{post.id}</td>
            <td>{post.firstName}</td>
            <td>{post.lastName}</td>
            <td>{post.email}</td>
            <td>{post.phone}</td>
            <td>{post.adress.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  active: state.active,
  tableSort: state.tableSort,
});

export default connect(mapStateToProps, { setActive, setTableSort })(Posts);
