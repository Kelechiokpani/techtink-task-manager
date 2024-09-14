"use client"
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface EditTaskDialogProps {
    open: boolean;
    task: { id: number; text: string } | null;
    onClose: () => void;
    onSave: (id: number, newText: string) => void;
}



const EditTask: React.FC<EditTaskDialogProps> = ({ open, task, onClose, onSave }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        if (task) {
            setText(task.text);
        }
    }, [task]);

    const handleSave = () => {
        if (task) {
            onSave(task.id, text);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Task Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTask;
