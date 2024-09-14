"use client";
import React, { useState, useEffect } from "react";
import { Container, Typography, List, Box, Modal, Button } from "@mui/material";
import TaskItem from "@/app/components/Tasks/TaskItem";
import TaskForm from "@/app/components/Tasks/TaskForm";
import SearchForm from "@/app/components/Tasks/SearchForm";
import SearchItem, {Task} from "@/app/components/Tasks/SearchItem";
import TimeDisplay from "@/app/utils/TimeFormatter";
import EditTask from "@/app/components/Tasks/EditTask";




const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState<Task[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [taskUndo, setTaskUndo] = useState<number | null>(null);

    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);



    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskText: string) => {
        const newTask: Task = { id: Date.now(), text: taskText, completed: false, completedAt: null };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const toggleComplete = (taskId: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed, completedAt: task.completed ? null : new Date().toISOString() }
                    : task
            )
        );
    };


    const editTask = (taskId: number) => {
        const task = tasks.find((task) => task.id === taskId) || null;
        setTaskToEdit(task);
        setEditDialogOpen(true);
    };

    const handleSaveEdit = (id: number, newText: string) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
    };


    const handleSearch = (query: string) => {
        if (query) {
            setSearch(tasks.filter((task) => task.text.toLowerCase().includes(query.toLowerCase())));
        } else {
            setSearch(tasks);
        }
    };

    const handleUndo = (taskId: number) => {
        setTaskUndo(taskId);
        setModal(true);
    };

    const confirmUndo = () => {
        setTasks(
            tasks.map((task) =>
                task.id === taskUndo ? { ...task, completed: false, completedAt: null } : task
            )
        );
        setModal(false);
    };

    const cancelUndo = () => {
        setModal(false);
        setTaskUndo(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                height: "80vh",
                paddingTop: "50px",
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    Pending Tasks
                </Typography>
                <Box
                    sx={{
                        minHeight: "80vh",
                        padding: "20px",
                    }}
                >
                    <TaskForm onAdd={addTask} />
                    <List>
                        {tasks
                            .filter((task) => !task.completed)
                            .map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onComplete={toggleComplete}
                                    onDelete={deleteTask}
                                    onEdit={editTask}
                                />
                            ))}
                    </List>
                </Box>
            </Container>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    Completed
                </Typography>
                <Box
                    sx={{
                        backgroundColor: "#FFE9E4",
                        minHeight: "80vh",
                        padding: "20px",
                    }}
                >
                    <SearchForm onSearch={handleSearch} />
                    <List>
                        {(search.length > 0 ? search : tasks)
                            .filter((task) => task.completed)
                            .map((task) => (
                                <SearchItem
                                    key={task.id}
                                    task={{
                                        ...task,
                                        completedAt: task.completedAt ? <TimeDisplay createdAt={task.completedAt} /> : null,
                                    }}
                                    onEdit={editTask}
                                    onDelete={deleteTask}
                                    onUndo={() => handleUndo(task.id)}

                                />
                            ))}
                    </List>
                </Box>
            </Container>
            <Modal open={modal} onClose={cancelUndo}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6">Confirm Undo</Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Are you sure you want to move this task back to pending?
                    </Typography>
                    <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                        <Button variant="contained" color="primary" onClick={confirmUndo}>
                            Yes
                        </Button>
                        <Button variant="outlined" onClick={cancelUndo}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {taskToEdit && (
                <EditTask
                    open={editDialogOpen}
                    task={taskToEdit}
                    onClose={() => setEditDialogOpen(false)}
                    onSave={handleSaveEdit}
                />
            )}

        </Box>
    );
};

export default Tasks;


