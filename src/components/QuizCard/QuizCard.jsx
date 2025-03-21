import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ActionsModal from "../ActionsModal/ActionsModal.jsx";
import css from "./QuizCard.module.css";

export default function QuizCard({ quiz }) {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div className={css.container}>
      <h2>{quiz.name}</h2>
      <p>{quiz.description}</p>
      <div ref={containerRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleModal();
          }}
        >
          ...
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
