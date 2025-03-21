import QuizList from "../../components/QuizList/QuizList";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  return (
    <div className={css.container}>
      <QuizList />
    </div>
  );
}
