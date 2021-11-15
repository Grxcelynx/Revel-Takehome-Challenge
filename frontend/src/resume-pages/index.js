import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export let GET_RESUME = gql`
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

export default function Resume() {
  let { loading, error, data } = useQuery(GET_RESUME);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error {error.message}</p>;

  let {
    resume: { firstName, lastName, email, funFact, bio, hobbies, pastJobs }
  } = data;

  return (
    <div>
      <header>
        <h1>
          Name: {firstName} {lastName}
        </h1>
        <p>
          <strong>Email: </strong>
          {email}
        </p>
      </header>

      <p>
        <strong>Fun fact: </strong>
        {funFact}
      </p>
      <p>
        <strong>Bio: </strong>
        {bio}
      </p>
      <p>
        <strong>Hobbies: </strong>
        {hobbies.join(", ")}
      </p>
      <div>
        <strong>Past jobs: </strong>
        {pastJobs.map(
          ({
            company,
            startDate,
            endDate,
            accomplishments,
            languagesUsed,
            technologiesUsed
          }) => {
            return (
              <div key={company}>
                <p>
                  <strong>Company: </strong>
                  {company}
                </p>
                <p>
                  <strong>Dates: </strong>
                  {startDate} - {endDate}
                </p>
                <p>
                  <strong>Accomplishments: </strong>
                  {accomplishments.join(", ")}
                </p>
                <p>
                  <strong>Languages used: </strong>
                  {languagesUsed.join(", ")}
                </p>
                <p>
                  <strong>Technologies used: </strong>
                  {technologiesUsed.join(", ")}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
