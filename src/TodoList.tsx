import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Clock from "./Timer.tsx";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList: React.FC = () => {
  const title: string = "오늘 할일";
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "공부하기", isChecked: false },
    { id: 2, text: "오류해결", isChecked: false },
    { id: 3, text: "cicd", isChecked: false },
  ]);

  const [newTodos, setNewTodos] = useState<string>("");
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleCheck = (id: number) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const addTodo = () => {
    if (newTodos.trim() !== "") {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), text: newTodos, isChecked: false },
      ]);
      setNewTodos("");
    }
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTodoClick = (item: Todo) => {
    setShowDetail(true);
    setSelectedTodo(item);
  };

  const closeDetail = () => {
    setShowDetail(false);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <input onChange={(e) => setNewTodos(e.target.value)} />
        <Button variant="warning" onClick={addTodo}>
          추가
        </Button>
      </div>
      <ListGroup>
        {todos.map((item, idx) => (
          <ListGroup.Item key={idx}>
            <input
              type="checkbox"
              onChange={(e) => {
                handleCheck(item.id);
              }}
            />
            <span onClick={() => handleTodoClick(item)}>
              {item.isChecked ? (
                <del>{item.text}</del>
              ) : (
                <span>{item.text}</span>
              )}
            </span>
            <Button onClick={() => handleDelete(item.id)}>삭제</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Clock />
    </div>
  );
};

export default TodoList;
