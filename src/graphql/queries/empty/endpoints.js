import gql from 'graphql-tag'

export const GET_ENDPOINTS = gql`
    query endpoints {
        endpoints {
            path
            description
        }
    }
`