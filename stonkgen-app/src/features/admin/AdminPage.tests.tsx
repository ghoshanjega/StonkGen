import React from "react";
import { render, screen } from "@testing-library/react";
import {AdminPage}from "./AdminPage";
// import "jest-dom/extend-expect";

jest.mock("./AdminPage.api.ts");

test("We show a list of posts", () => {
  render(<AdminPage />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});