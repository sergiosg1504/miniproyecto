import gql from "graphql-tag";

export const GET_ID = gql`
  query GET_ID {
    positions {
      id
      name
      archived
    }
  }
`;

export const GET_INTER = gql`
  query GET_INTER($position: String!) {
    interviews(position: $position) {
      url {
        public
      }
    }
  }
`;

export const INVITE_TO = gql`
  mutation INVITE_TO($candidate: inputCandidate, $positionId: String) {
    Position(id: $positionId) {
      invite(candidate: $candidate) {
        status
      }
    }
  }
`;

export const GET_CANDIDATES = gql`
  query GET_CANDIDATES($position: String!) {
    interviews(position: $position) {
      candidate {
        name
        email
      }
    }
  }
`;
export const ARCHIVE_POS = gql`
  mutation ARCHIVE_POS($positionId: String, $archive: Boolean!) {
    Position(id: $positionId) {
      archive(archive: $archive) {
        archived
      }
    }
  }
`;

export const DELETE_POS = gql`
  mutation DELETE_POS($positionId: String) {
    Position(id: $positionId) {
      delete
    }
  }
`;

export const CREATE_POS = gql`
  mutation CREATE_POS($position: PositionInputType) {
    Position {
      save(position: $position) {
        name
      }
    }
  }
`;
