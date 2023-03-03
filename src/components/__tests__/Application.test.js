import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText, getAllByTestId, getByDisplayValue, getByRole} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

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

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");

  const appointment = appointments[1];

  // 3. click on delete button
  fireEvent.click(getByAltText(appointment, "Delete"));

  // 4. check that confirmation component is shown
  expect(getByText(appointment, /are you sure you would like to delete\?/i)).toBeInTheDocument();

  // 5. click on confirm button
  fireEvent.click(getByText(appointment, "Confirm"))

  // 6. check that deleting satus message shows
  expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

  // 7. wait for status message to be removed
  await waitForElementToBeRemoved(() => getByText(appointment, /deleting/i));

  // 8. check that spots remaining is 2 for monday daylistitem
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");

  const appointment = appointments[1];

  // 3. click on edit button
  fireEvent.click(getByAltText(appointment, "Edit"));

  // 4. change student name and interviewer
  fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {target: {value: "New Name"}});
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // 5. click save button
  fireEvent.click(getByText(appointment, "Save"));

  // 6. check that saving status message is displayed
  expect(getByText(appointment, /saving/i)).toBeInTheDocument();

  // 7. wait for status component to be removed
  await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));

  // 8. check that student name and interviewer has changed in show component
  expect(getByText(appointment, "New Name")).toBeInTheDocument();
  expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

  // 9. check that spots remaining has stayed the same for the monday daylistitem
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
})

it("shows the save error when failing to save an appointment", async () => {
  // 1. make mock axios put reject when called
  axios.put.mockRejectedValueOnce();

  const {container, debug} = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");

  const appointment = appointments[0];

  // 2. enter name, choose interviewer and click save button
  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: "Joe Mama"}})
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, /save/i));

  // 3. wait for status element to be removed
  await waitForElementToBeRemoved(() => getByText(appointment, /saving/i))

  // 4. check to see if save error is displayed
  expect(getByText(appointment, /could not save appointment/i)).toBeInTheDocument();

  // 5. click close button on error element
  fireEvent.click(getByAltText(appointment, "Close"));

  // 6. check that appointment reverts to form view
  expect(getByRole(appointment, "form")).toBeInTheDocument();
});