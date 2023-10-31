import { Paper } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";

function ChartByUser() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <Paper className="p-4">
      <div>
        <h3>Select Date range</h3>
        <div className="border w-full px-4 py-2 rounded-xl mt-1">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            withPortal
            className="w-full grow"
          />
        </div>
      </div>
    </Paper>
  );
}

export default ChartByUser;
