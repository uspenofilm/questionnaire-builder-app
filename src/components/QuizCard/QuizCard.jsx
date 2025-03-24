import { useState, useRef } from "react";
import ActionsModal from "../ActionsModal/ActionsModal.jsx";
import css from "./QuizCard.module.css";
import { IoEllipsisVerticalOutline } from "@react-icons/all-files/io5/IoEllipsisVerticalOutline.js";

export default function QuizCard({ quiz }) {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div className={css.container}>
      <h3>{quiz.name}</h3>
      <p>{quiz.description}</p>
      <div className={css.bottomBlock}>
        <p>{`Questions: ${quiz.questionCount}`}</p>
        {quiz.completions !== undefined && (
          <p>{`Completions: ${quiz.completions}`}</p>
        )}
      </div>
      <div ref={containerRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleModal();
          }}
          className={css.actionBtn}
        >
          <IoEllipsisVerticalOutline />
        </button>
        {modalOpen && (
          <ActionsModal
            quiz={quiz}
            onClose={toggleModal}
            containerRef={containerRef}
          />
        )}
      </div>
    </div>
  );
}
