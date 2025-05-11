import { extractQueryParams } from "../utils/stringsCutter";

const Pagination = ({
  previous,
  next,
  setPagination,
}: {
  previous: string;
  next: string;
  setPagination: (pagination: string) => void;
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        className="pagination-button"
        onClick={() => setPagination(extractQueryParams(previous))}
        disabled={!previous}
      >
        <img src="/arrow-left.svg" alt="left-arrow" />
      </button>
      <button
        className="pagination-button"
        onClick={() => setPagination(extractQueryParams(next))}
        disabled={!next}
      >
        <img src="/arrow-right.svg" alt="right-arrow" />
      </button>
    </div>
  );
};

export default Pagination;
