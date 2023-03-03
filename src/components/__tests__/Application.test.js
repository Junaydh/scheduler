import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText, getAllByTestId} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected ", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  }
  );
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const {container, debug} = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");

  const appointment = appointments[0];

  // click add appointment, add name/interviewer and click save
  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: "Joe Mama"}})
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, /save/i));

  expect(getByText(appointment, /saving/i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByText(appointment, /saving/i))

  expect(getByText(appointment, "Joe Mama")).toBeInTheDocument();

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
});
