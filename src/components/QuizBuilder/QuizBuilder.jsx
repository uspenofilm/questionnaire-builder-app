import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import css from "./QuizBuilder.module.css";

const initialValues = {
  title: "",
  description: "",
  questions: [],
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  questions: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required("Question is required"),
        type: Yup.string().required("Type is required"),
        options: Yup.array().when("type", {
          is: (type) => type === "single" || type === "multiple",
          then: (schema) => schema.min(1, "At least one option is required"),
        }),
      })
    )
    .min(1, "At least one question is required"),
});

export default function QuizBuilder() {
  const handleSubmit = async (values) => {
    const questionCount = values.questions.length;

    const payload = {
      ...values,
      questionCount,
    };

    console.log("Submitting questionnaire:", payload);

    // try {
    //   const response = await fetch("https:", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to save questionnaire");
    //   }

    //   alert(
    //     `Questionnaire saved successfully! Total questions: ${questionCount}`
    //   );
    // } catch (error) {
    //   console.error("Error saving questionnaire:", error);
    //   alert("Error saving questionnaire. Please try again.");
    // }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <label>Title</label>
            <Field name="title" type="text" />
            <label>Description</label>
            <Field name="description" type="text" />
            <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map((q, index) => (
                    <div key={q.id || index}>
                      <label>Question {index + 1}</label>
                      <Field
                        name={`questions.${index}.label`}
                        type="text"
                        placeholder="Enter question"
                      />

                      <Field as="select" name={`questions.${index}.type`}>
                        <option value="">Select question type</option>
                        <option value="text">Text</option>
                        <option value="single">Single Choice</option>
                        <option value="multiple">Multiple Choices</option>
                      </Field>

                      {["single", "multiple"].includes(
                        values.questions[index]?.type
                      ) && (
                        <FieldArray name={`questions.${index}.options`}>
                          {({ push, remove }) => (
                            <div>
                              <label>Options</label>
                              {values.questions[index].options?.map(
                                (_, optIdx) => (
                                  <div key={optIdx}>
                                    <Field
                                      name={`questions.${index}.options.${optIdx}`}
                                      type="text"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => remove(optIdx)}
                                    >
                                      ✕ Remove Option
                                    </button>
                                  </div>
                                )
                              )}
                              <button type="button" onClick={() => push("")}>
                                + Add Option
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      )}

                      <button type="button" onClick={() => remove(index)}>
                        Remove Question
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ id: uuid(), label: "", type: "", options: [] })
                    }
                  >
                    + Add Question
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit">Save Questionnaire</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
