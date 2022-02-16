import gql from "graphql-tag";

export const GET_ID = gql` //Returns every position in the account, with its id, name and if its archived to filter them
  query GET_ID {
    positions {
      id
      name
      archived
    }
  }
`;

export const GET_INTER = gql` // Returns the url to the interviews giving a position ID
  query GET_INTER($position: String!) {
    interviews(position: $position) {
      url {
        public
      }
    }
  }
`;

export const INVITE_TO = gql` // Invite someone by its name and email and a valid position Id
  mutation INVITE_TO($candidate: inputCandidate, $positionId: String) {
    Position(id: $positionId) {
      invite(candidate: $candidate) {
        status
      }
    }
  }
`;

export const GET_CANDIDATES = gql` // Returns the candidates' name and email of position given
  query GET_CANDIDATES($position: String!) {
    interviews(position: $position) {
      candidate {
        name
        email
      }
    }
  }
`;
export const ARCHIVE_POS = gql` // Archive or active a position depending of the flag's value, needed a valid position Id
  mutation ARCHIVE_POS($positionId: String, $archive: Boolean!) {
    Position(id: $positionId) {
      archive(archive: $archive) {
        archived
      }
    }
  }
`;

export const DELETE_POS = gql` // Delete a position using it id
  mutation DELETE_POS($positionId: String) {
    Position(id: $positionId) {
      delete
    }
  }
`;

export const CREATE_POS = gql` // Create a position depending of the attributes of the object
  mutation CREATE_POS($position: PositionInputType) {
    Position {
      save(position: $position) {
        name
      }
    }
  }
`;
