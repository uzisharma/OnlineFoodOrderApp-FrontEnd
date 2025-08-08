import { useState } from "react";
import "./style/PageNavigation.css";

export default function PageNavigation({ totalPages, setBaseUrl }) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setBaseUrl(
        "http://localhost:8080/api/restaurant/getByPage?pageNum=" + (page - 1)
      );
    }
  };

  // Compute the range of page numbers to show
  const getPageRange = () => {
    let start = Math.max(currentPage - 1, 1);
    let end = start + 3;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - 3, 1);
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <>
      <Jump
        arrow="<"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {getPageRange().map((page) => (
        <PageNumber
          key={page}
          number={page}
          isActive={currentPage === page}
          onClick={() => goToPage(page)}
        />
      ))}

      {getPageRange().at(-1) < totalPages && (
        <>
          <span className="ellipsis">...</span>
          <PageNumber
            number={totalPages}
            isActive={currentPage === totalPages}
            onClick={() => goToPage(totalPages)}
          />
        </>
      )}

      <Jump
        arrow=">"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </>
  );
}

function PageNumber({ number, onClick, isActive }) {
  return (
    <button
      className={`num-disp ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {number}
    </button>
  );
}

function Jump({ arrow, onClick, disabled }) {
  return (
    <button className="arrow-disp" onClick={onClick} disabled={disabled}>
      {arrow}
    </button>
  );
}
