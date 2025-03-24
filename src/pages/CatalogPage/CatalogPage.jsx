import QuizList from "../../components/QuizList/QuizList";
import css from "./CatalogPage.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchQuiz } from "../../redux/operations.js";
import { useSelector } from "react-redux";

export default function CatalogPage() {
  const { items: quiz, status, error } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const currentPage = Number.parseInt(quiz.page);

  useEffect(() => {
    dispatch(fetchQuiz({ page: 1 }));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading items...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={css.container}>
      <QuizList />
      <div className={css.pagination}>
        <button
          disabled={currentPage === 1}
          className={css.btn}
          onClick={() => {
            dispatch(fetchQuiz({ page: currentPage - 1 }));
          }}
        >
          Prev
        </button>
        <button
          disabled={currentPage >= quiz.totalPages}
          className={css.btn}
          onClick={() => {
            if (quiz.totalPages > currentPage) {
              dispatch(fetchQuiz({ page: currentPage + 1 }));
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
