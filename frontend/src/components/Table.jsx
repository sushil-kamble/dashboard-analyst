import { forwardRef, useEffect, useState } from "react";
import axios from "../utils/axios";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TableContent from "./TableContent";
import DatePicker from "react-datepicker";
import AddOrderModal from "./AddOrderModal";

function MainTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [itemType, setItemType] = useState("");
  const [orderState, setOrderState] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    axios
      .get("/orders", {
        params: {
          item_type: itemType,
          state: orderState,
          start_date: startDate,
          end_date: endDate,
          page: page + 1,
        },
      })
      .then(({ data }) => {
        setData(data.orders);
        setTotalItems(data.total);
      });
  }, [page, itemType, orderState, endDate]);

  const handleSetPage = (page) => {
    setPage(page);
  };

  const handleOrderStateChange = (e) => {
    setOrderState(e.target.value);
    setPage(0);
  };

  const handleItemTypeChange = (e) => {
    setItemType(e.target.value);
    setPage(0);
  };

  const ClickableInput = forwardRef(({ onClick, ...props }, ref) => (
    <div onClick={onClick}>
      <input {...props} />
    </div>
  ));

  return (
    <div className="p-4 rounded-lg bg-slate-100">
      <div className="flex items-center justify-between gap-4 my-4">
        <div>
          <h1 className="text-2xl font-bold">All Orders</h1>
        </div>
        <div className="flex items-center gap-6 basis-1/2">
          <FormControl fullWidth>
            <InputLabel id="item-type">Item Type</InputLabel>
            <Select
              labelId="item-type"
              value={itemType}
              label="item-type"
              onChange={handleItemTypeChange}
            >
              <MenuItem value={"Cookies"}>Cookies</MenuItem>
              <MenuItem value={"Cake"}>Cake</MenuItem>
              <MenuItem value={"Muffins"}>Muffins</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="order-state">Order State</InputLabel>
            <Select
              labelId="order-state"
              value={orderState}
              label="order-state"
              onChange={handleOrderStateChange}
            >
              <MenuItem value={"Created"}>Created</MenuItem>
              <MenuItem value={"Shipped"}>Shipped</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
              <MenuItem value={"Canceled"}>Canceled</MenuItem>
            </Select>
          </FormControl>
          <div className="w-full">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              withPortal
              customInput={<ClickableInput />}
              className="p-4 w-full border-2 rounded-lg cursor-pointer"
              placeholderText="Select Date Range"
            />
          </div>
        </div>
        <AddOrderModal />
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContent
          data={data}
          total={totalItems}
          page={page}
          setPage={handleSetPage}
        />
      </Paper>
    </div>
  );
}

export default MainTable;
