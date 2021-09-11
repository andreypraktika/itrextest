import React, { useMemo } from "react";
import { connect } from 'react-redux';
import { setActive, setTableSort } from "../Redux/redux-reducers";
import { useTable, useSortBy } from 'react-table';

const Posts = (props) => {
  const { active, posts, data } = props;

  function handleClick(id){
    props.setActive(posts.filter(post => post.id === id)[0]);
    console.log(active);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', 
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'State',
        accessor: 'adress.state',
      },
    ],
    []
  )
  const tableInstance = useTable({columns,data}, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <table class="table" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render('Header')}
              {column.isSorted ? (column.isSortedDesc ? ' desc' : ' asc') : ''}
            </th>
          ))}
        </tr>
      ))}
      </thead>
     <tbody {...getTableBodyProps()}>
       {// Loop over the table rows
       rows.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
     </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  active: state.active,
});

export default connect(mapStateToProps, { setActive })(Posts);
