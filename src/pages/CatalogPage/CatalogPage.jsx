import QuizList from "../../components/QuizList/QuizList";
import css from "./CatalogPage.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchQuiz } from "../../redux/operations.js";
import { useSelector } from "react-redux";
import { selectQuiz } from "../../redux/slice.js";

export default function CatalogPage() {
  const quiz = useSelector(selectQuiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuiz({ page: 1 }));
  }, [dispatch]);
  return (
    <div className={css.container}>
      <QuizList />
      <button
        className={css.btn}
        onClick={() => {
          const currentPage = Number.parseInt(quiz.page);
          if (quiz.totalPages > currentPage) {
            dispatch(fetchQuiz({ page: currentPage + 1 }));
          }
        }}
      >
        Load more
      </button>
    </div>
  );
}
