import gql from 'graphql-tag'

export const GET_ID=gql  //Esta es para recuperar todas y filtrarlas
                    `query ExampleQuery {
                        positions {
                            id
                            name
                            archived
                        }
                    }`

export const GET_INTER = gql // Esta no se usa, pero recupera los enlaces a las invitaciones, lo que os mostramos en el meet
                         `query ExampleQuery($position: String!) {
                            interviews(position: $position) {
                              url {
                                    public
                              }
                            }
                           }`

export const INVITE_TO = gql // esta es la mutation para invitar
                          `
                            mutation INVITE_TO($candidate: inputCandidate, $positionId: String) {
                              Position(id: $positionId) {
                                invite(candidate: $candidate) {
                                  status
                                  }
                                }
                              }
                          `

export const GET_CANDIDATES = gql  // y esta dado un id de una entrevista recupera todos los candidatos con nombre y email
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
