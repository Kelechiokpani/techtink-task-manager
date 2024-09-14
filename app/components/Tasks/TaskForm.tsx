import {ChangeEvent, FormEvent, useState} from "react";
import { TextField, Button, Box } from "@mui/material";



interface TaskFormProps {
    onAdd: (taskText: string) => void;
}


const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
    const [input, setInput] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        onAdd(input);
        setInput("");
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mt={2}>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={input}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TaskForm;
