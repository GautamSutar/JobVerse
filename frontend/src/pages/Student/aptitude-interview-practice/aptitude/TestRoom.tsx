import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWSStore } from "../../../../store/webSocketStore/wsStore";

interface QuestionOption {
  char: string;
  text: string;
}
interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  category: string;
  difficulty: string;
}

const TestRoom: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { connect, disconnect, sendMessage, lastMessage, isConnected } =
    useWSStore();
  const [question, setQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    if (sessionId) {
      connect(sessionId);
    }
    return () => {
      disconnect();
    };
  }, [sessionId, connect, disconnect]);
  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === "new_question" && lastMessage.question) {
        setQuestion(lastMessage.question);
        setTimeLeft(lastMessage.question.duration);
      }
      if (lastMessage.type === "test_finished") {
        console.log(`Test finished: ${lastMessage.reason}`);
        navigate(`/results/${sessionId}`);
      }
    }
  }, [lastMessage, navigate, sessionId]);
  useEffect(() => {
    const timerInterval = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [question]);
  const handleAnswerSubmit = (optionChar: string) => {
    sendMessage({
      type: "submit_answer",
      question_id: question?.id,
      answer: optionChar,
    });
  };
  if (!isConnected || !question) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        {isConnected ? "Waiting for question..." : "Connecting to test..."}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 font-sans">
      <header /* ... */>
        <h1 className="text-2xl font-bold">{question.category}</h1>
        <div className="text-2xl font-mono bg-gray-700 px-4 py-2 rounded">
          {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
      </header>
      <main /* ... */>
        <h2 className="text-3xl font-semibold mb-6">{question.text}</h2>
        <div
          role="radiogroup"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {question.options.map((option) => (
            <button
              key={option.char}
              onClick={() => handleAnswerSubmit(option.char)}
              /* ... (styling) ... */
            >
              {option.text}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TestRoom;
