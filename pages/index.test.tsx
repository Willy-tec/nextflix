import "@testing-library/jest-dom";

import {render, screen} from "@testing-library/react";
import {sampleData} from "../src/types/TMDB";
import Home from "./index";

test("renders learn react link", () => {
  const data = [] as sampleData[];
  const discovery = {};
  render(<Home data={data} discovery={discovery} />);
});
