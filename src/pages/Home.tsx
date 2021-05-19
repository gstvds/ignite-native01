import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle !== '') {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
  
      setTasks((previousState: Task[]) => {
        return [...previousState, data]
      });
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const newState = tasks.map((item) => {
      if (item.id === id) return { ...item, done: !item.done };
      return item;
    });

    setTasks(newState);
  }

  function handleRemoveTask(id: number) {
    const newState = tasks.filter((item) => item.id !== id);
    setTasks(newState);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}