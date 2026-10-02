const Pagination = ({ page, totalPages, onPageChange }) => {
  const safeTotalPages = Math.min(totalPages, 500);

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Previous
      </button>

      <span>
        Page <strong>{page}</strong> of{" "}
        <strong>{safeTotalPages}</strong>
      </span>

      <button
        disabled={page === safeTotalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;