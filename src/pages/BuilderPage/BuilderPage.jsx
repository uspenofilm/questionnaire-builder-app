import css from "./BuilderPage.module.css";
import QuizBuilder from "../../components/QuizBuilder/QuizBuilder.jsx";

export default function BuilderPage() {
  return (
    <div className={css.container}>
      <h2>Create a Quiz</h2>
      <QuizBuilder />
    </div>
  );
}
