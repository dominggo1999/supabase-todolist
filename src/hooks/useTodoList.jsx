import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTodos } from '../services/todo';

const useTodoList = (setLoading, setError) => {
  const [todoList, setTodoList] = useState([]);
  const { currentUser } = useAuth();

  const removeTodoFromUI = (id) => {
    setTodoList((prev) => {
      return prev.filter((i) => i.id !== id);
    });
  };

  const todo = async () => {
    const { data, success } = await getTodos(currentUser.id);

    if(success) {
      setTodoList(data);
    } else {
      setError('Something went wroing');
    }
    setLoading(false);
  };

  useEffect(() => {
    todo();
  }, []);

  return { todoList, removeTodoFromUI };
};

export default useTodoList;
