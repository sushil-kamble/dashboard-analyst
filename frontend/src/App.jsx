import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  capitalize,
} from "@mui/material";
import Table from "./components/Table";
import Bar from "./components/charts/Bar";
import Line from "./components/charts/Line";
import { Fragment, useState } from "react";
import ItemTypeChart from "./components/charts/custom-chart/ItemType";

export default function App() {
  const [category, setCategory] = useState("distribution");
  const [lineCategory, setLineCategory] = useState("distribution");
  return (
    <div className="min-h-screen">
      <div className="bg-purple-200">
        <nav className="container mx-auto py-4 ">
          <h2 className="text-lg font-medium">Star Bakery</h2>
        </nav>
      </div>
      <div className="container mx-auto py-4 flex flex-col gap-10">
        <Table />

        <div className="p-3 border rounded-xl bg-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">{capitalize(category)}</h2>
            <FormControl>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"distribution"}>Distribution</MenuItem>
                <MenuItem value={"revenue"}>Revenue</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {category === "distribution" ? (
              <Fragment key={category}>
                <Bar
                  title="Distribution by Item Type"
                  label="Number of Orders"
                  endPoint="distribution/item"
                />
                <Bar
                  title="Distribution by State"
                  label="Number of Orders"
                  endPoint="distribution/state"
                />
                <Line
                  title="Total Orders Daily"
                  endPoint="total/day"
                  label="Number of Orders"
                />
                <Bar
                  title="Top 5 Customers by Number of Orders"
                  endPoint="distribution/customers"
                  label="Number of Orders"
                />
              </Fragment>
            ) : (
              <Fragment>
                <Bar
                  title="Revenue by Item Type (in Rupees)"
                  label="Revenue Generated "
                  endPoint="revenue/item"
                />
                <Bar
                  title="Weekly Revenue Generated"
                  endPoint="revenue/week"
                  label="Revenue Generated "
                />
                <Line
                  title="Revenue Generated Daily"
                  endPoint="revenue/day"
                  label="Revenue Generated "
                />
                <Bar
                  title="Top 5 Branches by Revenue Generated"
                  endPoint="revenue/branch"
                  label="Revenue Generated "
                />
              </Fragment>
            )}
          </div>
        </div>

        <div className="p-3 border rounded-xl bg-slate-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">{capitalize(category)}</h2>
            <FormControl>
              <InputLabel id="line-category-label">Category</InputLabel>
              <Select
                labelId="line-category-label"
                value={lineCategory}
                label="Category"
                onChange={(e) => setLineCategory(e.target.value)}
              >
                <MenuItem value={"distribution"}>Distribution</MenuItem>
                <MenuItem value={"revenue"}>Revenue</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <ItemTypeChart category={lineCategory} key={lineCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
