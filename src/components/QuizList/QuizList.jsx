import css from "./QuizList.module.css";
import QuizCard from "../QuizCard/QuizCard.jsx";
import { useSelector } from "react-redux";
import { selectQuiz } from "../../redux/slice.js";

export default function QuizList() {
  const quizCollection = useSelector(selectQuiz);
  console.log(quizCollection);
  return (
    <ul className={css.container}>
      {quizCollection.quiz.map((quiz) => {
        return (
          <li key={quiz.id}>
            <QuizCard quiz={quiz} />
          </li>
        );
      })}
    </ul>
  );
}
