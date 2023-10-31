import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";

function TableContent({ data, total, page, setPage }) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="right">Item Type</TableCell>
              <TableCell align="right">Branch</TableCell>
              <TableCell align="right">Order State</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Updated Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.order_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.order_id}
                </TableCell>
                <TableCell align="right">{row.item_type}</TableCell>
                <TableCell align="right">{row.branch}</TableCell>
                <TableCell align="right">{row.order_state}</TableCell>
                <TableCell align="right">{row.customer_id}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">
                  {dayjs(row.last_updated_time).format("DD/MM HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={total}
        rowsPerPage={10}
        page={page}
        onPageChange={(e, page) => {
          setPage(page);
        }}
      />
    </Paper>
  );
}

export default TableContent;
