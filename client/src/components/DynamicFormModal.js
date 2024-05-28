import "../pages/CreateQuizPage.css";
import styles from "./DynamicForm.module.css";
import React, { useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'

const DynamicFormModal = ({ show, handleClose }) => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [optionType, setOptionType] = useState("text");
  const [activeQuestion, setActiveQuestion] = useState(0);

  const [selectedType, setSelectedType] = useState("QnA");
  const [timerTime, setTimerTime] = useState("OFF");

  const handleQnAType = () => {
    setSelectedType("QnA");
  };
  const handlePollType = () => {
    setSelectedType("Poll");
  };
  const setTimerOff = () => {
    setTimerTime("OFF");
  };
  const set5SecTimer = () => {
    setTimerTime("5Sec");
  };
  const set10SecTimer = () => {
    setTimerTime("10Sec");
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        {
          id: questions.length + 1,
          name: "",
          options: [
            {
              text: "",
              image: "",
            },
            {
              text: "",
              image: "",
            },
          ],
          correctOption: 0,
        },
      ]);
      setActiveQuestion(questions.length);
    }
  };

  const addOption = (index) => {
    if (questions[index].options.length < 4) {
      const newQuestions = questions.map((question, i) =>
        i === index
          ? {
              ...question,
              options: [
                ...question.options,
                {
                  text: "",
                  image: "",
                },
              ],
            }
          : question,
      );
      setQuestions(newQuestions);
    }
  };
  const deleteOption = (index, optionIndex) => {
    const newQuestions = questions.map((question, i) =>
      i === index
        ? {
            ...question,
            options: question.options.filter((option, j) => j !== optionIndex),
          }
        : question,
    );
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      setActiveQuestion(Math.max(0, activeQuestion - 1));
    }
  };

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuestionNameChange = (index, event) => {
    const newQuestions = questions.map((question, i) =>
      i === index ? { ...question, name: event.target.value } : question,
    );
    setQuestions(newQuestions);
  };

  const handleTextOptionChange = (index, optionIndex, event) => {
    const newQuestions = questions.map((question, i) =>
      i === index
        ? {
            ...question,
            options: question.options.map((option, j) =>
              j === optionIndex
                ? { ...option, text: event.target.value }
                : option,
            ),
          }
        : question,
    );
    setQuestions(newQuestions);
  };
  const handleImageOptionChange = (index, optionIndex, event) => {
    const newQuestions = questions.map((question, i) =>
      i === index
        ? {
            ...question,
            options: question.options.map((option, j) =>
              j === optionIndex
                ? { ...option, image: event.target.value }
                : option,
            ),
          }
        : question,
    );
    setQuestions(newQuestions);
  };
  const handleTextOptionType = () => {
    setOptionType("text");
  };
  const handleImageOptionType = () => {
    setOptionType("Image");
  };
  const handleText_ImageOptionType = () => {
    setOptionType("text&Image");
  };
  const handleCorrectOptionChange = (index, event) => {
    const newQuestions = questions.map((question, i) =>
      i === index
        ? { ...question, correctOption: parseInt(event.target.value) }
        : question,
    );
    setQuestions(newQuestions);
  };

  const handleFormSubmit = async () => {
    const quizData = {
      name: quizName,
      selectedType,
      optionType,
      questions,
      timerTime,
    };
    // if(questions.length == index)
    console.log(quizData);
    try {
      const response = await axios.post("/quiz",quizData);
      console.log("Success:", response.data);

      handleClose(); // Optionally close the modal on success
      setQuizName("");setQuestions([]);setTimerTime("OFF");setSelectedType("QnA");setOptionType("text");
      toast.success('Submitted successfully')
    } catch (error) {
      console.error("Error:", error);
      toast.error('Failed!')
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        {!questions.length && (
          <div className={styles.first_model}>
            <input
              type="text"
              value={quizName}
              onChange={handleQuizNameChange}
              placeholder="Quiz Name"
              className={styles.Quiz_name}
            />
            <div className={styles.place_row}>
              <div>Quiz Type</div>
              <div
                className={styles.QnAType}
                // style={style}
                onClick={handleQnAType}
                style={
                  selectedType === "QnA"
                    ? { "backgroundColor": "#60b84b", color: "white" }
                    : {}
                }
              >
                Q&A
              </div>
              <div
                className={styles.PollType}
                // style={sstyle}
                onClick={handlePollType}
                style={
                  selectedType === "Poll"
                    ? { "backgroundColor": "#60b84b", color: "white" }
                    : {}
                }
              >
                Poll Name
              </div>
            </div>
            <div className={styles.action_item}>
              <div className={styles.cancel_button} onClick={handleClose}>
                Cancel
              </div>
              <div
                className={styles.continue_button}
                onClick={() =>
                  setQuestions([
                    {
                      id: 1,
                      name: "",
                      options: [
                        {
                          text: "",
                          image: "",
                        },
                        {
                          text: "",
                          image: "",
                        },
                      ],
                      correctOption: 0,
                    },
                  ])
                }
              >
                Continue
              </div>
            </div>
          </div>
        )}
        {!!questions.length && (
          <>
            <div className={styles.tabs}>
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`${styles.tab_container} ${activeQuestion === index ? "active" : ""}`}
                >
                  <div
                    className={`${styles.tab} ${styles.One_tab} ${activeQuestion === index ? "active" : ""}`}
                  >
                    {questions.length > 1 && index != 0 && (
                      <div
                        className={styles.close_question} // "delete-button"
                        onClick={() => deleteQuestion(index)}
                      >
                        &times;
                      </div>
                    )}
                    <div
                      onClick={() => setActiveQuestion(index)}
                      className={styles.Question_number_one}
                    >
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
              <div
                className={styles.add_button}
                onClick={addQuestion} //addQuestion
                disabled={questions.length >= 5}
              >
                +
              </div>
            </div>
            <div className="form-container">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`form-content ${activeQuestion === index ? "active" : ""}`}
                >
                  <form>
                    <div className="form-group">
                      {selectedType == "QnA" && (
                        <input
                          className={styles.Question_name}
                          type="text"
                          id={`questionName${index}`}
                          value={question.name}
                          onChange={(e) => handleQuestionNameChange(index, e)}
                          placeholder="Q&A Question"
                        />
                      )}
                      {selectedType == "Poll" && (
                        <input
                          className={styles.Question_name}
                          type="text"
                          id={`questionName${index}`}
                          value={question.name}
                          onChange={(e) => handleQuestionNameChange(index, e)}
                          placeholder="Poll Question"
                        />
                      )}
                    </div>

                    {index === activeQuestion && (
                      <div className={styles.option_type}>
                        <div className={styles.option_type}>
                          <div className={styles.option_One}>Option Type</div>
                        </div>
                        <div className={styles.option_type}>
                          <input
                            type="radio"
                            value={0}
                            checked={optionType === "text"}
                            onChange={handleTextOptionType}
                          />
                          <div className={styles.option_One}>Text</div>
                        </div>

                        <div className={styles.option_type}>
                          <input
                            type="radio"
                            value={1}
                            checked={optionType === "Image"}
                            onChange={handleImageOptionType}
                          />
                          <div className={styles.option_One}>Image URL</div>
                        </div>
                        <div className={styles.option_type}>
                          <input
                            type="radio"
                            value={2}
                            checked={optionType === "text&Image"}
                            onChange={handleText_ImageOptionType}
                          />
                          <div className={styles.option_One}>
                            Text & Image URL
                          </div>
                        </div>
                      </div>
                    )}
                    <div className={styles.options_timer_container}>
                      <div className={styles.options_container}>
                        {question.options.map((option, optionIndex) => (
                          <div className={styles.Options} key={optionIndex}>
                            {selectedType == "QnA" && (
                              <input
                                className={styles.radio_button}
                                type="radio"
                                id={`correctOption${optionIndex}${index}`}
                                name={`correctOption${index}`}
                                value={optionIndex}
                                checked={question.correctOption === optionIndex}
                                onChange={(e) =>
                                  handleCorrectOptionChange(index, e)
                                }
                              />
                            )}
                            {optionType === "text" && (
                              <input
                                style={
                                  question.correctOption === optionIndex
                                    ? {
                                        "backgroundColor": "#60b84b",
                                        color: "white",
                                      }
                                    : {}
                                }
                                type="text"
                                id={`option${optionIndex}${index}`}
                                value={option.text}
                                onChange={(e) =>
                                  handleTextOptionChange(index, optionIndex, e)
                                }
                                placeholder="Text"
                                className={`${styles.option_input} ${styles.button}
                                `}
                              />
                            )}
                            {optionType === "Image" && (
                              <input
                                style={
                                  question.correctOption === optionIndex
                                    ? {
                                        "backgroundColor": "#60b84b",
                                        color: "white",
                                      }
                                    : {}
                                }
                                className={`${styles.option_input} ${styles.button}`}
                                type="text"
                                id={`option${optionIndex}${index}`}
                                value={option.image}
                                onChange={(e) =>
                                  handleImageOptionChange(index, optionIndex, e)
                                }
                                placeholder="Image URL"
                              />
                            )}
                            {optionType === "text&Image" && (
                              <>
                                <input
                                  style={
                                    question.correctOption === optionIndex
                                      ? {
                                          "backgroundColor": "#60b84b",
                                          color: "white",
                                        }
                                      : {}
                                  }
                                  className={`${styles.option_Text_input} ${styles.button}`}
                                  type="text"
                                  id={`optionText${optionIndex}${index}`}
                                  value={option.text}
                                  onChange={(e) =>
                                    handleTextOptionChange(
                                      index,
                                      optionIndex,
                                      e,
                                    )
                                  }
                                  placeholder="Text"
                                />
                                <input
                                  style={
                                    question.correctOption === optionIndex
                                      ? {
                                          "backgroundColor": "#60b84b",
                                          color: "white",
                                        }
                                      : {}
                                  }
                                  className={`${styles.option_input} ${styles.button}`}
                                  type="text"
                                  id={`optionImage${optionIndex}${index}`}
                                  value={option.image}
                                  onChange={(e) =>
                                    handleImageOptionChange(
                                      index,
                                      optionIndex,
                                      e,
                                    )
                                  }
                                  placeholder="Image URL"
                                />
                              </>
                            )}
                            {optionIndex > 1 && (
                              <div
                                className={styles.delete_option}
                                onClick={() => deleteOption(index, optionIndex)}
                              >
                                X
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {selectedType === "QnA" && (
                        <div className={styles.timer_container}>
                          <div className={`${styles.timer_header} `}>Timer</div>
                          <div
                            className={`${styles.timer_button} ${styles.button}`}
                            onClick={setTimerOff}
                            style={
                              timerTime === "OFF"
                                ? {
                                    "backgroundColor": "#D60000",
                                    color: "white",
                                  }
                                : {}
                            }
                          >
                            OFF
                          </div>
                          <div
                            className={`${styles.timer_button} ${styles.button}`}
                            onClick={set5SecTimer}
                            style={
                              timerTime === "5Sec"
                                ? {
                                    "backgroundColor": "#D60000",
                                    color: "white",
                                  }
                                : {}
                            }
                          >
                            5 Sec
                          </div>
                          <div
                            className={`${styles.timer_button} ${styles.button}`}
                            onClick={set10SecTimer}
                            style={
                              timerTime === "10Sec"
                                ? {
                                    "backgroundColor": "#D60000",
                                    color: "white",
                                  }
                                : {}
                            }
                          >
                            10 Sec
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`${styles.Add_option} ${styles.button}`}
                      onClick={() => addOption(index)}
                    >
                      Add Option
                    </div>
                  </form>
                </div>
              ))}
            </div>
            <div className={styles.action_item}>
              <div className={styles.cancel_button} onClick={handleClose}>
                Cancel
              </div>
              <div
                className={styles.continue_button}
                onClick={handleFormSubmit}
                disabled={questions.length != 5}
              >
                Create Quiz
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicFormModal;