import gql from 'graphql-tag'

export const GET_PING = gql`
    query ping {
        ping
    }
`