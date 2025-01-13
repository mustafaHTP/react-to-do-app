import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from "./ToDoList.module.css";
import taskMoveSfx from "/src/assets/sfx/taskMove.wav";
import taskAddSfx from "/src/assets/sfx/taskAdd.wav";
import taskDeleteSfx from "/src/assets/sfx/taskDelete.wav";

function ToDoList() {

    const [tasks, setTasks] = useState([
        {
            id: uuidv4(),
            description: "Buy groceries"
        },
        {
            id: uuidv4(),
            description: "Clean the house"
        },
        {
            id: uuidv4(),
            description: "Cook dinner"
        }
    ]);
    const [taskInput, setTaskInput] = useState("");

    const handleTaskInput = (event) => {
        setTaskInput(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    }

    const addTask = () => {
        if (!taskInput) {
            alert("Please enter a task");

            return;
        }

        // Create a new task object
        const newTask = {
            id: uuidv4(),
            description: taskInput
        }

        setTasks([...tasks, newTask]);
        playTaskAddSfx();

        // Clear the input field
        setTaskInput("");
    }

    const moveTaskUp = (id) => {
        const index = tasks.findIndex((t) => t.id === id);

        if (index === 0) {
            return;
        }

        // Swap the task with the one above it
        const newTasks = [...tasks];
        const temp = newTasks[index];
        newTasks[index] = newTasks[index - 1];
        newTasks[index - 1] = temp;

        playTaskMoveSfx();
        setTasks(newTasks);
    }

    const moveTaskDown = (id) => {
        const index = tasks.findIndex((t) => t.id === id);

        if (index === tasks.length - 1) {
            return;
        }

        const newTasks = [...tasks];
        const temp = newTasks[index];
        newTasks[index] = newTasks[index + 1];
        newTasks[index + 1] = temp;

        playTaskMoveSfx();

        setTasks(newTasks);
    }

    const deleteTaskById = (id) => {
        setTasks(t => t.filter((t) => t.id !== id));
        playTaskDeleteSfx();
    }

    const playTaskMoveSfx = () => {
        new Audio(taskMoveSfx).play();
    }

    const playTaskAddSfx = () => {
        new Audio(taskAddSfx).play();
    }

    const playTaskDeleteSfx = () => {        
        new Audio(taskDeleteSfx).play();
    }

    return (
        <div className={styles['container']}>
            <h1>To-Do List</h1>
            <div className={styles['input-container']}>
                <input className={styles['input-task']} value={taskInput} onKeyDown={handleKeyDown} onChange={handleTaskInput} type="text" placeholder="Enter a task" />
                <button className={`${styles['btn']} ${styles['btn-add']}`} onClick={addTask}>Add</button>
            </div>
            <ol className={styles['task-list']}>
                {tasks.map((task) => {
                    return <li className={styles['task-item']} key={task.id}>
                        <span className={styles['task-description']}>
                            {task.description}
                        </span>
                        <div className={styles['btn-container']}>
                            <button className={`${styles['btn']} ${styles['btn-delete']}`} onClick={() => deleteTaskById(task.id)}>
                                Delete
                            </button>
                            <button className={`${styles['btn']} ${styles['btn-move-up']}`} onClick={() => moveTaskUp(task.id)}>👍</button>
                            <button className={`${styles['btn']} ${styles['btn-move-down']}`} onClick={() => moveTaskDown(task.id)}>👎</button>
                        </div>
                    </li>
                })}
            </ol>
        </div>
    );
}

export default ToDoList;