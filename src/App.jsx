import { useState, useEffect } from "react";
import moment from "moment";
import {
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./App.css";
import { TimeField, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/de";

function App() {
  const [advancedMode, setAdvancedMode] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [repeat, setRepeat] = useState("Hourly");
  const [advRepeatEvery, setAdvRepeatEvery] = useState(1);
  const [advRepeatUnit, setAdvRepeatUnit] = useState("Minutes");

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    setStartDate(today);
    //TODO: fix
    const currTime = dayjs();
    setStartTime(currTime.$d);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskTitle,
      startDate,
      endDate,
      startTime,
      repeat,
      advancedMode,
      advRepeatEvery,
      advRepeatUnit,
    };
    console.log({ newTask });
    setTaskTitle("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setRepeat("Hourly");
    setAdvancedMode(false);
    setAdvRepeatEvery(1);
    setAdvRepeatUnit("Minutes");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Recurring Reminders
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            required
            fullWidth
            label="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </Box>
        <Box mb={2} display="flex" gap={2}>
          <TextField
            required
            fullWidth
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <TextField
            fullWidth
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Box>
        <Box mb={2} display="flex" gap={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            {/* //TODO: fix */}
            <TimePicker
              label="Start Time"
              format="hh:mm a"
              onChange={(newvalue) => setStartTime(newvalue.$d)}
              value={startTime}
            />
          </LocalizationProvider>
        </Box>
        {advancedMode === false ? (
          <>
            <FormControl fullWidth mb={2}>
              <InputLabel id="repeat-every-label">Repeat</InputLabel>
              <Select
                labelId="repeat-every-label"
                value={repeat}
                label="Repeat"
                onChange={(e) => setRepeat(e.target.value)}
              >
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography>
                <Checkbox value="First of month" />
                First of month
              </Typography>
              <Typography>
                <Checkbox value="Last of month" />
                Last of month
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography>Repeat Every </Typography>
              <TextField
                type="number"
                value={advRepeatEvery}
                min="1"
                max="999"
                onChange={(e) => setAdvRepeatEvery(e.target.value)}
                style={{ width: "100px", marginLeft: "10px" }}
              />
              <FormControl style={{ marginLeft: "10px" }}>
                <Select
                  value={advRepeatUnit}
                  onChange={(e) => setAdvRepeatUnit(e.target.value)}
                >
                  <MenuItem value="Minutes">Minute</MenuItem>
                  <MenuItem value="Hours">Hour</MenuItem>
                  <MenuItem value="Days">Day</MenuItem>
                  <MenuItem value="Months">Month</MenuItem>
                  <MenuItem value="Years">Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </>
        )}{" "}
        <Box display="flex" alignItems="center" mb={2}>
          <span>
            <Checkbox
              checked={advancedMode}
              onChange={(e) => {
                setAdvancedMode(e.target.checked);
              }}
            />
            Advanced mode
          </span>
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Add Task
        </Button>
      </form>
    </Container>
  );
}

export default App;
