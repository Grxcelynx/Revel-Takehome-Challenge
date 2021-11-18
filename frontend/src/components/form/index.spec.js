import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

import Form, { EDIT_RESUME } from "./";

let props = {
  resume: {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    funFact: "Im fake!",
    bio: "Not much to say about me since I don't exist!",
    hobbies: ["impersonating a person"],
    pastJobs: [
      {
        company: "Fake Inc.",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        accomplishments: ["Get a job without being alive!"],
        languagesUsed: ["JAVASCRIPT"],
        technologiesUsed: ["REACT"]
      }
    ]
  }
};

const mocks = [];

let renderComponent = ({ props, mocks }) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Form {...props} />
    </MockedProvider>
  );

describe("form", () => {
  it("displays all resume fields", () => {
    const { getByLabelText } = renderComponent({ props, mocks: [] });

    // This test will fail if this text is not on the page as labels
    getByLabelText(/first name/i);
    getByLabelText(/last name/i);
    getByLabelText(/email/i);
    getByLabelText(/fun fact/i);
    getByLabelText(/bio/i);

    // Below is where the test will fail, since these need to be created
    // Remove the comments below and make it work :)

    getByLabelText(/hobbies/i);
    // getByLabelText(/past jobs/i);
  });

  it("loads the existing form in on first mount", () => {
    const { getByLabelText } = renderComponent({ props, mocks: [] });

    expect(getByLabelText(/first name/i).value).toBe(props.resume.firstName);
    expect(getByLabelText(/last name/i).value).toBe(props.resume.lastName);
    expect(getByLabelText(/email/i).value).toBe(props.resume.email);
    expect(getByLabelText(/fun fact/i).value).toBe(props.resume.funFact);
    expect(getByLabelText(/bio/i).value).toBe(props.resume.bio);

    // Below is where the test will fail, since these need to be created
    // Remove the comments below and make it work :)

    // expect(getByLabelText(/hobbies/i).value).toBe(props.resume.hobbies);
    // expect(getByLabelText(/past jobs/i).value).toBe(props.resume.pastJobs);
  });

  it("allows mutliple hobby fields to be added", () => {
    // Needs to be created
    // Create this test last, after all the other tests pass
    // https://testing-library.com/docs/react-testing-library/cheatsheet
  });

  it("allows mutliple pastJobs field groups to be added", () => {
    // Needs to be created
    // Create this test last, after all the other tests pass
    // https://testing-library.com/docs/react-testing-library/cheatsheet
  });

  it("displays error message if mutation returns an error", async () => {
    let error = "Fake error";

    let mocks = [
      {
        request: {
          query: EDIT_RESUME,
          variables: props.resume
        },
        error: new Error(error)
      }
    ];

    let { getByText } = renderComponent({ mocks, props });

    await wait(0);

    getByText(new RegExp(error, "ig"));
  });
});
