import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationProps = {
   value: number;
   onChangePagination: (e: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ value, onChangePagination }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=">"
         onPageChange={elem => { onChangePagination(elem.selected + 1) }}
         pageRangeDisplayed={4}
         pageCount={3}
         forcePage={value - 1}
         previousLabel="<"
      />
   );
};

export default Pagination;