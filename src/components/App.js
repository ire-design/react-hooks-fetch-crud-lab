import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    prompt: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctIndex: '0',
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch('http://localhost:4000/questions');
    const data = await response.json();
    setQuestions(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const newQuestion = await response.json();
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setFormData({
      prompt: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctIndex: '0',
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    });
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  return (
    <div>
      <nav>
        <button onClick={() => { /* handle navigation */ }}>Create New Question</button>
        <button onClick={() => { /* handle navigation */ }}>View Questions</button>
      </nav>
      <main>
        <section>
          <h1>New Question</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Prompt:
              <input
                name="prompt"
                type="text"
                value={formData.prompt}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Answer 1:
              <input
                name="answer1"
                type="text"
                value={formData.answer1}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Answer 2:
              <input
                name="answer2"
                type="text"
                value={formData.answer2}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Answer 3:
              <input
                name="answer3"
                type="text"
                value={formData.answer3}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Answer 4:
              <input
                name="answer4"
                type="text"
                value={formData.answer4}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Correct Answer:
              <select
                name="correctIndex"
                value={formData.correctIndex}
                onChange={handleInputChange}
              >
                <option value="0">{formData.answer1}</option>
                <option value="1">{formData.answer2}</option>
                <option value="2">{formData.answer3}</option>
                <option value="3">{formData.answer4}</option>
              </select>
            </label>
            <button type="submit">Add Question</button>
          </form>
        </section>
        <h1>Quiz Questions</h1>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <h4>Question {question.id}</h4>
              <h5>Prompt: {question.prompt}</h5>
              <label>
                Correct Answer:
                <select
                  value={question.correctIndex}
                  readOnly
                >
                  <option value="0">{question.answer1}</option>
                  <option value="1">{question.answer2}</option>
                  <option value="2">{question.answer3}</option>
                  <option value="3">{question.answer4}</option>
                </select>
              </label>
              <button onClick={() => handleDelete(question.id)}>
                Delete Question
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
