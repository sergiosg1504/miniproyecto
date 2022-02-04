import gql from 'graphql-tag'

export const GET_ID=gql
                    `query ExampleQuery {
                        positions {
                            id
                            name
                            archived
                        }
                    }`

export const GET_INTER = gql
                         `query ExampleQuery($position: String!) {
                            interviews(position: $position) {
                              url {
                                    public
                              }
                            }
                           }`

export const INVITE_TO = gql
                          `
                            mutation INVITE_TO($candidate: inputCandidate, $positionId: String) {
                              Position(id: $positionId) {
                                invite(candidate: $candidate) {
                                  status
                                  }
                                }
                              }
                          `

export const GET_CANDIDATES = gql 
                              `
                                query RootQueryType($position: String!) {
                                  interviews(position: $position) {
                                    candidate {
                                      name
                                      email
                                    }
                                  }
                                }
                              `
// Salen las url de todas incluso estando completadas, si no lo están permite realizar la videoentrevista
