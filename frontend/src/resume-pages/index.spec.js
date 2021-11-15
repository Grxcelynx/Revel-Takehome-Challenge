import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

import Resume, { GET_RESUME } from "./";

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

let renderComponent = ({ mocks }) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Resume {...props} />
    </MockedProvider>
  );

describe("resume", () => {
  it("displays all resume fields", async () => {
    let mocks = [
      {
        request: {
          query: GET_RESUME
        },
        result: {
          data: {
            resume: props.resume
          }
        }
      }
    ];

    let { getByText } = renderComponent({ mocks });

    await wait(0);

    // This test will fail if there is no text that matches the resume fields on the page
    getByText(new RegExp(props.resume.firstName, "ig"));
    getByText(new RegExp(props.resume.lastName, "ig"));
    getByText(new RegExp(props.resume.email, "ig"));
    getByText(new RegExp(props.resume.funFact, "ig"));
    getByText(new RegExp(props.resume.bio, "ig"));
    getByText(new RegExp(props.resume.bio, "ig"));
    getByText(new RegExp(props.resume.hobbies[0], "ig"));
    getByText(new RegExp(props.resume.pastJobs[0].company, "ig"));
    getByText(new RegExp(props.resume.pastJobs[0].accomplishments[0], "ig"));
    getByText(new RegExp(props.resume.pastJobs[0].languagesUsed[0], "ig"));
    getByText(new RegExp(props.resume.pastJobs[0].technologiesUsed[0], "ig"));
  });

  it("displays error message if error occurs", async () => {
    let error = "some error";

    let mocks = [
      {
        request: {
          query: GET_RESUME
        },
        error: new Error(error)
      }
    ];

    let { getByText } = renderComponent({ mocks });

    await wait(0);

    // This test will fail if there is no error message diplay on error
    getByText(new RegExp(error, "ig"));
  });
});
