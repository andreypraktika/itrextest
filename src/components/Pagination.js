import React from 'react';
import "../pagination.css";
import { setCurrentPage } from "../Redux/redux-reducers";
import { connect } from "react-redux";


const Pagination = (props) => {
  const { postsPerPage, totalPosts, paginate, currentPage } = props;
  const pageNumbers = [];
  const lastPage = Math.ceil(totalPosts / postsPerPage)
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        <li>
        <a hidden={currentPage === 1 && true} onClick={() => {
          console.log(currentPage);
          props.setCurrentPage(currentPage - 1)
          console.log(currentPage);
          }} href='!#' className='page-link' >Prev</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link' id={currentPage === number && 'active'} >
              {number}
            </a>
          </li>
        ))}
        <li>
        <a hidden={ currentPage === lastPage && true} onClick={() => {
          props.setCurrentPage(currentPage + 1)
          }} href='!#' className='page-link' >Next</a>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});

export default connect(mapStateToProps, { setCurrentPage })(Pagination);

