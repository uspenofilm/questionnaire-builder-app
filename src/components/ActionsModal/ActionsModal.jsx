import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from "./ActionsModal.module.css";
import { useDispatch } from "react-redux";
import { deleteQuiz } from "../../redux/operations.js";

export default function ActionsModal({ quiz, onClose, containerRef }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, containerRef]);

  const handleEditClick = () => {
    navigate(`/${quiz._id}/edit`);
    onClose();
  };

  const handleRunClick = () => {
    navigate(`/${quiz._id}/run`);
    onClose();
  };

  const handleDeleteClick = () => {
    dispatch(deleteQuiz(quiz._id));
    onClose();
  };

  return (
    <div ref={dropdownRef} className={css.container}>
      <ul className={css.dropdownList}>
        <li onClick={handleEditClick} className={css.dropdownItem}>
          Edit
        </li>
        <li onClick={handleRunClick} className={css.dropdownItem}>
          Run
        </li>
        <li onClick={handleDeleteClick} className={css.dropdownItem}>
          Delete
        </li>
      </ul>
    </div>
  );
}
