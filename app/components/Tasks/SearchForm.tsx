import { useState, ChangeEvent, FC } from "react";
import { TextField, Box } from "@mui/material";

interface SearchFormProps {
  onSearch: (value: string) => void;
}

const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
      <Box component="form" display="flex" gap={2} mt={2}>
        <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={input}
            onChange={handleChange}
        />
      </Box>
  );
};

export default SearchForm;
