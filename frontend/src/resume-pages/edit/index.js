import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Form from "../../components/form";

let GET_RESUME = gql`
  query GetResume {
    resume {
      firstName
      lastName
      email
      funFact
      bio
      hobbies
      pastJobs {
        company
        startDate
        endDate
        accomplishments
        languagesUsed
        technologiesUsed
      }
    }
  }
`;

export default function EditResume() {
  let { loading, error, data } = useQuery(GET_RESUME);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <header>
        <h1 className="Title">Edit Resume</h1>
      </header>

      <Form resume={data.resume} />
    </div>
  );
}
