import css from "./QuizList.module.css";
import QuizCard from "../QuizCard/QuizCard";
// import { useSelector } from "react-redux";
// import { selectCars } from "../../redux/Cars/slice";

export default function QuizList() {
  // const quizCollection = useSelector(selectQuiz);

  const quizCollection = [
    { id: "01", name: "first", description: "first quiz" },
    { id: "02", name: "second", description: "second quiz" },
    { id: "03", name: "third", description: "third quiz" },
  ];

  return (
    <ul className={css.container}>
      {quizCollection.map((quiz) => {
        return (
          <li key={quiz.id}>
            <QuizCard quiz={quiz} />
          </li>
        );
      })}
    </ul>
  );
}
