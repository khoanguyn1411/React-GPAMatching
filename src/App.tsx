import { Box, MenuItem, Select, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <Box padding={5}>
      <Typography>Mui theme work! yg</Typography>
      <Select>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </Box>
  );
};
export default App;
