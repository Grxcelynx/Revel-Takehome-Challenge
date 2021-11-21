import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./index.module.scss";
import { render } from "@testing-library/react";

export let EDIT_RESUME = gql`
  mutation EditResume(
    $firstName: String!
    $lastName: String!
    $email: String!
    $funFact: String!
    $bio: String!
    $hobbies: [String]!
    $pastJobs: [JobInput]!
  ) {
    editResume(
      firstName: $firstName
      lastName: $lastName
      email: $email
      funFact: $funFact
      bio: $bio
      hobbies: $hobbies
      pastJobs: $pastJobs
    ) {
      success
      errors

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
          languagesUsed
          technologiesUsed
        }
      }
    }
  }
`;

let removeTypeName = pastJobs =>
  pastJobs.map(
    ({
      company,
      startDate,
      endDate,
      accomplishments,
      languagesUsed,
      technologiesUsed
    }) => ({
      company,
      startDate,
      endDate,
      accomplishments,
      languagesUsed,
      technologiesUsed
    })
  );

export default function Form({ resume: initialResume }) {
  let [resume, setResume] = useState({
    ...initialResume,
    pastJobs: removeTypeName(initialResume.pastJobs)
  });

  let [editResume] = useMutation(EDIT_RESUME);
  console.log(resume)
  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        editResume({ variables: resume });
      }}
    >
      <div>
        <label htmlFor="firstName" className={styles.inputWrapper}>
          First name
          <input
            id="firstName"
            value={resume.firstName}
            onChange={({ target: { value } }) =>
              setResume({ ...resume, firstName: value })
            }
          />
        </label>
      </div>

      <div>
        <label htmlFor="lastName" className={styles.inputWrapper}>
          Last name
          <input
            id="lastName"
            value={resume.lastName}
            onChange={({ target: { value } }) =>
              setResume({ ...resume, lastName: value })
            }
          />
        </label>
      </div>

      <div>
        <label htmlFor="email" className={styles.inputWrapper}>
          Email
          <input
            id="email"
            value={resume.email}
            onChange={({ target: { value } }) =>
              setResume({ ...resume, email: value })
            }
          />
        </label>
      </div>

      <div>
        <label htmlFor="funFact" className={styles.inputWrapper}>
          Fun fact
          <input
            id="funFact"
            value={resume.funFact}
            onChange={({ target: { value } }) =>
              setResume({ ...resume, funFact: value })
            }
          />
        </label>
      </div>

      <div>
        <label htmlFor="bio" className={styles.inputWrapper}>
          Bio
          <textarea
            id="bio"
            value={resume.bio}
            onChange={({ target: { value } }) =>
              setResume({ ...resume, bio: value })
            }
          />
        </label>
      </div>

      <div>
        <label htmlFor="hobbies" className={styles.inputWrapper}>
          Hobbies
          <input
            id="hobbies"
            value={resume.hobbies}
            onChange={({ target: {value} })=>
              setResume({ ...resume, hobbies: value.split(",")})
          }
          />
        </label>
      </div>

      <label htmlFor="past jobs" className={styles.inputWrapper}>
          Past Jobs
        
      
      <div>
        {resume.pastJobs.map(({
              company,
              startDate,
              endDate,
              accomplishments,
              languagesUsed,
              technologiesUsed
        }) => (
        <div 
        id="pastJobs"
        value={resume.pastJobs}
        onChange={({ target: {value} })=>
          setResume({ ...resume, pastJobs: value})
      }
        >
          <p>{company}</p>
          <div>{startDate}</div>
          <div>{endDate}</div>
          <div>{accomplishments}</div>
          <div>{languagesUsed}</div>
          <div>{technologiesUsed}</div>
        </div>
        
        ))}

      </div>
      </label>


      <button type="submit" >Save</button> 
      

      {/* https://www.apollographql.com/docs/react/data/mutations/#tracking-loading-and-error-states */}
      <p>Fake error, this needs to be implemented</p>
    </form>
  );
}
