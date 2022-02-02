import gql from 'graphql-tag'

export const GET_INFO = gql`
    query info {
        info {
            id
            username
        }
    }
`