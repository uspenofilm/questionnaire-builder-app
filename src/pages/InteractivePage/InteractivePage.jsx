import css from "./InteractivePage.module.css";
import QuizRunPage from "../../components/QuizRun/QuizRun.jsx";

export default function InteractivePage() {
  return (
    <div className={css.container}>
      <QuizRunPage />
    </div>
  );
}
