import "./pagination.css";
interface PaginationProps {
  posts: Record<string, any>[];
  currentPage: number;
  setCurrentPage: (arg: number) => any;
}

const Pagination = (props: PaginationProps) => {
  const { posts, currentPage, setCurrentPage } = props;

  const PAGE_SIZE = 20;

  const pagesCount = Math.ceil(posts.length / PAGE_SIZE);

  const totalPageCount = pagesCount === 1 ? 1 : pagesCount;

  const handleNextPageChange = (page: number) => {
    setCurrentPage(page + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (page === pagesCount) {
      setCurrentPage(page);
    } else {
      setCurrentPage(page + 1);
    }
  };

  const handlePreviousPageChange = (page: number) => {
    setCurrentPage(page - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (page === 1) {
      setCurrentPage(1);
    }
  };

  return (
    <div className="paginationContainer">
      <span
        className="previous"
        style={{
          visibility: currentPage === 1 ? "hidden" : "visible",
        }}
      >
        <button
          className="previousPageButton"
          onClick={() => handlePreviousPageChange(currentPage)}
        >
          Previous
        </button>
      </span>

      <div className="pageNumber">
        <span className="currentPage">{currentPage}</span>
        <span className="paginationPreposition"> of </span>
        <span className="totalPageCount">{totalPageCount}</span>
      </div>

      <span
        className="next"
        style={{
          visibility: currentPage === pagesCount ? "hidden" : "visible",
        }}
      >
        <button
          className="nextPageButton"
          onClick={() => handleNextPageChange(currentPage)}
        >
          Next
        </button>
      </span>
    </div>
  );
};

export default Pagination;
