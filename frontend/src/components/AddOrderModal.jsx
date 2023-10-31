import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "../utils/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function AddOrderModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemType, setItemType] = useState("");
  const [orderState, setOrderState] = useState("");
  const [branchId, setBranchId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/orders", {
      item_type: itemType,
      order_state: orderState,
      branch: Number(branchId),
      customer_id: Number(customerId),
    });
    // Reload the page
    window.location.reload();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" className="w-[150px]">
        Add Order
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <h2 className="text-2xl">New Order</h2>
            <FormControl fullWidth>
              <InputLabel id="item-type">Item Type</InputLabel>
              <Select
                labelId="item-type"
                value={itemType}
                required
                label="item-type"
                onChange={(e) => setItemType(e.target.value)}
              >
                <MenuItem value={"Cookies"}>Cookies</MenuItem>
                <MenuItem value={"Cake"}>Cake</MenuItem>
                <MenuItem value={"Muffins"}>Muffins</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="item-type">Order State</InputLabel>
              <Select
                labelId="order-state"
                value={orderState}
                required
                label="order-state"
                onChange={(e) => setOrderState(e.target.value)}
              >
                <MenuItem value={"Created"}>Created</MenuItem>
                <MenuItem value={"Shipped"}>Shipped</MenuItem>
                <MenuItem value={"Delivered"}>Delivered</MenuItem>
                <MenuItem value={"Canceled"}>Canceled</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Branch Id"
              variant="outlined"
              value={branchId}
              required
              onChange={(e) => setBranchId(e.target.value)}
              type="number"
              fullWidth
            />
            <TextField
              label="Customer Id"
              variant="outlined"
              type="number"
              value={customerId}
              required
              onChange={(e) => setCustomerId(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              onClick={handleOpen}
              variant="contained"
              fullWidth
            >
              Add Order
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddOrderModal;
