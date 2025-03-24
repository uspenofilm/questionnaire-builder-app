import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import css from "./QuizBuilder.module.css";
import { useDispatch } from "react-redux";
import { addQuiz } from "../../redux/operations.js";
import { useSelector } from "react-redux";
import { resetAddItemStatus } from "../../redux/slice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  questions: [],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  questions: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required("Question is required"),
        type: Yup.string().required("Type is required"),
        options: Yup.array().when("type", {
          is: (type) => type === "single" || type === "multiple",
          then: (schema) =>
            schema
              .min(1, "At least one option is required")
              .of(Yup.string().required("Option is required")),
        }),
      })
    )
    .min(1, "At least one question is required"),
});

function QuestionItem({ q, index, remove }) {
  return (
    <div className={css.questionWrapper}>
      <div className={css.questions}>
        <label>{`${index + 1}. `}</label>
        <div className={css.fieldError}>
          <Field
            name={`questions.${index}.label`}
            type="text"
            placeholder="Enter question"
            className={css.field}
          />
          <ErrorMessage
            name={`questions.${index}.label`}
            component="div"
            className={css.error}
          />
        </div>
        <div className={css.fieldError}>
          <Field
            as="select"
            name={`questions.${index}.type`}
            className={css.select}
          >
            <option value="">Select question type</option>
            <option value="text">Text</option>
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choices</option>
          </Field>
          <ErrorMessage
            name={`questions.${index}.type`}
            component="div"
            className={css.error}
          />
        </div>
        <button type="button" onClick={() => remove(index)} className={css.btn}>
          Remove Question
        </button>
      </div>

      {["single", "multiple"].includes(q?.type) && (
        <FieldArray name={`questions.${index}.options`}>
          {({ push, remove }) => (
            <div className={css.optionsWrapper}>
              <label>Options</label>
              <div className={css.options}>
                {q.options.length === 0 && (
                  <ErrorMessage
                    name={`questions.${index}.options`}
                    component="div"
                    className={css.error}
                  />
                )}
                {q.options?.map((_, optIdx) => (
                  <div key={optIdx} className={css.option}>
                    <Field
                      name={`questions.${index}.options.${optIdx}`}
                      type="text"
                      className={css.field}
                    />
                    <ErrorMessage
                      name={`questions.${index}.options.${optIdx}`}
                      component="div"
                      className={css.error}
                    />
                    <button
                      type="button"
                      onClick={() => remove(optIdx)}
                      className={css.btn}
                    >
                      Remove Option
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push("")}
                  className={css.addOptBtn}
                >
                  Add Option
                </button>
              </div>
            </div>
          )}
        </FieldArray>
      )}
    </div>
  );
}

export default function QuizBuilder() {
  const { addItemStatus, addItemError } = useSelector((state) => state.quiz);
  console.log("[QuizBuilder]", { addItemStatus, addItemError });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetAddItemStatus());
  }, [dispatch]);

  useEffect(() => {
    if (addItemStatus === "succeeded") {
      dispatch(resetAddItemStatus());
      alert("Saved");
      navigate("/");
    }
  }, [addItemStatus, navigate]);

  const onAddQuiz = (newQuiz) => {
    dispatch(addQuiz(newQuiz));
  };

  const handleSubmit = async (values) => {
    const questionCount = values.questions.length;

    const payload = {
      ...values,
      questionCount,
    };

    onAddQuiz(payload);

    console.log("Submitting questionnaire:", payload);
  };

  return (
    <div>
      {addItemStatus === "failed" && alert("Error!")}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            className={css.container}
            disabled={addItemStatus !== "loading"}
          >
            <label>Title</label>
            <Field name="name" type="text" className={css.field} />
            <ErrorMessage name="name" component="div" className={css.error} />
            <label>Description</label>
            <Field name="description" type="text" className={css.field} />
            <ErrorMessage
              name="description"
              component="div"
              className={css.error}
            />
            <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.length === 0 && (
                    <ErrorMessage
                      name="questions"
                      component="div"
                      className={css.error}
                    />
                  )}
                  {values.questions.map((q, index) => (
                    <QuestionItem
                      key={q.id || index}
                      q={q}
                      index={index}
                      remove={remove}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ id: uuid(), label: "", type: "", options: [] })
                    }
                    className={css.btn}
                  >
                    Add Question
                  </button>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              disabled={addItemStatus === "loading"}
              className={css.saveBtn}
            >
              {addItemStatus === "loading" ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
