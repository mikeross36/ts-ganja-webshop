import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";
import { GanjaType } from "../../types/GanjaTypes";
import ProductCard from "../../components/ProductCard";
import { getAllGanjasAction } from "../../state";
import { GanjaActionType } from "../../state/actions/ganja";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const ProductsPage = ({ productsPerPage = 3, pagesPerPagination = 3 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { ganjas, error, loading } = useAppSelector(
    (state) => state.getAllGanjas
  );
  let totalPages: number;
  if (ganjas) {
    totalPages = Math.round(ganjas!.length / productsPerPage);
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllGanjasAction() as unknown as GanjaActionType);
  }, [dispatch]);

  const setProductsToPage = (): GanjaType[] => {
    const startIdx = currentPage * productsPerPage - productsPerPage;
    const endIdx = startIdx + productsPerPage;
    return ganjas!.slice(startIdx, endIdx);
  };

  const setPageButtons = (): number[] => {
    const startIdx =
      Math.floor((currentPage - 1) / pagesPerPagination) * pagesPerPagination;
    return [...Array(pagesPerPagination).keys()].map((_, idx) => {
      return startIdx + idx + 1;
    });
  };

  const changeCurrentPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pageNum = Number(e.currentTarget.textContent);
    setCurrentPage(pageNum);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Products Page</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{getError(error as unknown as ApiError)}</Message>
      ) : (
        <section className="products section container">
          <h2 className="section__title">our products</h2>
          {loading ? (
            <Loader />
          ) : (
            <ul className="products__container">
              {ganjas!.length > 0 &&
                setProductsToPage()?.map((ganja: GanjaType) => {
                  return <ProductCard key={ganja._id} ganja={ganja} />;
                })}
            </ul>
          )}
          <div className="products__pagination">
            <button className="page__nav-btn" onClick={prevPage}>
              prev
            </button>
            {setPageButtons().map((pageNum, idx) => {
              return (
                <button
                  key={idx}
                  onClick={changeCurrentPage}
                  className={`page__num-btn ${
                    currentPage === pageNum
                      ? "page__num-active"
                      : currentPage >= totalPages && "page__num-disabled"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button className="page__nav-btn" onClick={nextPage}>
              next
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductsPage;
