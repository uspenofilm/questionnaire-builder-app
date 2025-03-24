import QuizList from "../../components/QuizList/QuizList";
import css from "./CatalogPage.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchQuiz } from "../../redux/operations.js";
import { useSelector } from "react-redux";

export default function CatalogPage() {
  const { items: quiz, status, error } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

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
      {Number.parseInt(quiz.page) < quiz.totalPages && (
        <button
          className={css.btn}
          onClick={() => {
            if (quiz.totalPages > Number.parseInt(quiz.page)) {
              dispatch(fetchQuiz({ page: Number.parseInt(quiz.page) + 1 }));
            }
          }}
        >
          Load more
        </button>
      )}
    </div>
  );
}
