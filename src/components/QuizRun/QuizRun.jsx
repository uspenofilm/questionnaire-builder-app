import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import css from "./QuizRun.module.css";
import { useDispatch } from "react-redux";
import { runQuiz } from "../../redux/operations.js";
import { useSelector } from "react-redux";
import { resetRunStatus } from "../../redux/slice.js";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuizById } from "../../redux/operations.js";

const initialValues = {
  answers: [],
};

const validationSchema = Yup.object({
  answers: Yup.array().required("Answer is required"),
});

function QuestionItem({ q, index }) {
  return (
    <div className={css.questionWrapper}>
      <div className={css.questions}>
        <label>{`${index + 1}. `}</label>
        <div className={css.fieldError}>
          <span>{q.label}</span>
        </div>
        {q.type === "text" && (
          <>
            <Field
              name={`answers.${index}.text`}
              type="text"
              placeholder="Enter answer"
              className={css.field}
            />
            <ErrorMessage
              name={`answers.${index}.text`}
              component="div"
              className={css.error}
            />
          </>
        )}
        {q.type === "single" && (
          <>
            <div role="group" aria-labelledby="my-radio-group">
              {q.options.map((option, optionIndex) => {
                return (
                  <label key={optionIndex}>
                    <Field
                      type="radio"
                      name={`answers.${index}.single`}
                      value={option}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
            <ErrorMessage
              name={`answers.${index}.single`}
              component="div"
              className={css.error}
            />
          </>
        )}
        {q.type === "multiple" && (
          <>
            <div role="group" aria-labelledby="checkbox-group">
              {q.options.map((option, optionIndex) => {
                return (
                  <label key={optionIndex}>
                    <Field
                      type="checkbox"
                      name={`answers.${index}.multiple`}
                      value={option}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
            <ErrorMessage
              name={`answers.${index}.multiple`}
              component="div"
              className={css.error}
            />
          </>
        )}
      </div>
    </div>
  );
}

function QuizRun({ quiz }) {
  const { runStatus, runError } = useSelector((state) => state.quiz);
  console.log("[QuizRun]", { runStatus, runError });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetRunStatus());
  }, [dispatch]);

  useEffect(() => {
    if (runStatus === "succeeded") {
      dispatch(resetRunStatus());
      alert("Saved");
      navigate("/");
    }
    if (runStatus === "failed") {
      alert("Error!");
    }
  }, [runStatus, navigate]);

  const onRunQuiz = (answers) => {
    dispatch(runQuiz(answers));
  };

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      id: quiz._id,
    };

    onRunQuiz(payload);

    console.log("Submitting answers:", payload);
  };

  return (
    <div>
      {runStatus === "failed" && { runError }}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={css.container} disabled={runStatus !== "loading"}>
            <label>{quiz.name}</label>
            <label>{quiz.description}</label>
            {quiz.questions.map((q, index) => {
              return <QuestionItem key={q.id || index} q={q} index={index} />;
            })}
            <button
              type="submit"
              disabled={runStatus === "loading"}
              className={css.saveBtn}
            >
              {runStatus === "loading" ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default function QuizRunPage() {
  const { id } = useParams();
  const {
    item: quiz,
    getItemStatus,
    getItemError,
  } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizById(id));
  }, [dispatch]);

  if (getItemStatus === "loading") {
    return <div>Loading items...</div>;
  }

  if (getItemStatus === "failed") {
    return <div>Error: {getItemError}</div>;
  }

  if (!quiz) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <QuizRun quiz={quiz} />
    </div>
  );
}
