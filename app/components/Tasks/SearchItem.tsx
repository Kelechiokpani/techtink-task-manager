import {ListItem, IconButton, ListItemText, Typography} from "@mui/material";
import {Delete, Edit, Undo} from "@mui/icons-material";
import TimeDisplay from "@/app/utils/TimeFormatter";



export interface Task {
    id: number;
    text: string;
    completed: boolean;
    completedAt?: string | any;
}



interface SearchItemProps {
    task: Task;
    onEdit: (taskId: number) => void;
    onUndo: (taskId: any) => void;
    onDelete: (taskId: number) => void;
}


const SearchItem: React.FC<SearchItemProps> = ({ task, onEdit, onUndo, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" color="info" onClick={() => onEdit(task.id)}>
            <Edit />
          </IconButton>

            {task.completed && (
                <IconButton edge="end" color="warning" onClick={() => onUndo(task.id)}>
                {/*<IconButton edge="end" color="warning" onClick={onUndo}>*/}
                    <Undo />
                </IconButton>
            )}


            {task.completed && (
                <IconButton edge="end" color="error" onClick={() => onDelete(task.id)}>
                    <Delete />
                </IconButton>
            )}
        </>
      }
    >

      <ListItemText primary={task.text}

                    secondary={
                        task.completedAt && (
                            <Typography variant="body2" color="text.secondary">
                                 <TimeDisplay createdAt={task.completedAt} />
                            </Typography>
                        )
                    }
      />
    </ListItem>
  );
};

export default SearchItem;
