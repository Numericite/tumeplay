import {gql} from '@apollo/client';
// import {REACT_APP_ZONE} from '@env';

export const GET_MODULES = gql`
  query getModules {
    modules {
      id
      thematique {
        id
        title
      }
      niveau {
        name
        value
      }
      questionsArray {
        id
        text_question
        text_answer
        responses {
          response_A
          response_B
          response_C
          right_answer
        }
      }
    }
  }
`;