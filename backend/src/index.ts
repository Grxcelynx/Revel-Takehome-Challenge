import { ApolloServer, gql } from 'apollo-server';
import lowDb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

type Language = 'HTML' | 'SCSS' | 'JAVASCRIPT' | 'RUBY' | 'GRAPHQL';

type Technology =
  | 'REACT'
  | 'RAILS'
  | 'GRAPHQL_RUBY'
  | 'APOLLO'
  | 'INTEGRATION_TEST_FRAMEWORK'
  | 'JEST';

interface Job {
  company: string;
  startDate: string;
  endDate: string;
  accomplishments: string[];
  languagesUsed: Language[];
  technologiesUsed: Technology[];
}

interface Resume {
  firstName: string;
  lastName: string;
  email: string;
  funFact: string;
  bio: string;
  hobbies: string[];
  pastJobs: Job[];
}

const DEFAULT_RESUME: Resume = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@doe.com',
  funFact: 'Im fake!',
  bio: "Not much to say about me since I don't exist!",
  hobbies: ['impersonating a person'],
  pastJobs: [
    {
      company: 'Fake Inc.',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      accomplishments: ['Get a job without being alive!'],
      languagesUsed: ['JAVASCRIPT'],
      technologiesUsed: ['REACT'],
    },
  ],
};

let adapter = new FileSync('./db.json');
let db = lowDb(adapter);

let typeDefs = gql`
  enum Language {
    HTML
    SCSS
    JAVASCRIPT
    RUBY
    GRAPHQL
  }

  enum Technology {
    REACT
    RAILS
    GRAPHQL_RUBY
    APOLLO
    INTEGRATION_TEST_FRAMEWORK
    JEST
  }

  type Job {
    company: String!
    startDate: String!
    endDate: String!
    accomplishments: [String!]!
    languagesUsed: [Language]!
    technologiesUsed: [Technology]!
  }

  type Resume {
    firstName: String!
    lastName: String!
    email: String!
    funFact: String!
    bio: String!
    hobbies: [String]!
    pastJobs: [Job]!
  }

  type Query {
    resume: Resume
  }

  type EditResumePayload {
    resume: Resume
    success: Boolean!
    errors: [String!]
  }

  input JobInput {
    company: String!
    startDate: String!
    endDate: String!
    accomplishments: [String!]!
    languagesUsed: [Language]!
    technologiesUsed: [Technology]!
  }

  type Mutation {
    editResume(
      firstName: String!
      lastName: String!
      email: String!
      funFact: String!
      bio: String!
      hobbies: [String]!
      pastJobs: [JobInput]!
    ): EditResumePayload!
  }
`;

let resolvers = {
  Query: {
    resume: () => db.get('resume').value(),
  },
  Mutation: {
    editResume: (_parent: any, args: Resume) => {
      try {
        Object.entries(args).forEach(([key, value]) => {
          db.set(`resume.${key}`, value).write();
        });

        return {
          resume: db.get('resume').value(),
          success: true,
          errors: [],
        };
      } catch (e) {
        return { success: false, errors: [e.message], resume: null };
      }
    },
  },
};

let server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
