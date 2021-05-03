import { FC, useState } from "react";
import "../../styles/PaginationBar.css";
import { Pagination } from "react-bootstrap";

const PaginationBar: FC<{
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  setCurrentPage: (cp: number) => void;
}> = ({ postsPerPage, totalPosts, paginate, currentPage, setCurrentPage }) => {
  const [pageNumberLimit, setPageNumberLimit] = useState(10);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageLimit) {
    pageIncrementBtn = <li onClick={handleNext}> &hellip</li>;
  }
  let pageDecrementBtn = null;
  if (pageNumbers.length > maxPageLimit) {
    pageDecrementBtn = <li onClick={handlePrev}> &hellip</li>;
  }

  return (
    <ul className="pageNumbers">
      <li className={currentPage === pageNumbers[0] ? "hide" : "show"}>
        <button onClick={handlePrev}>Previous</button>
      </li>
      {pageDecrementBtn}
      {pageNumbers.map((number) => {
        if (number < maxPageLimit + 1 && number >= minPageNumberLimit) {
          return (
            <li
              key={number}
              className={currentPage == number ? "active" : undefined}
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          );
        } else {
          return null;
        }
      })}
      {pageIncrementBtn}
      <li
        className={
          currentPage === pageNumbers[pageNumbers.length - 1] ? "hide" : "show"
        }
      >
        <button onClick={handleNext}>Next</button>
      </li>
    </ul>
  );
};

export default PaginationBar;
