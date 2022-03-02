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

// Devuelve lo de la pantalla para ver las cosas pero se necesita el login para acceder, lo otro devuelve el titulo de la pregunta y la url de la respuesta
export const GET_INTER_INFO = gql`
  query GET_INTER_INFO($position: String!) {
    interviews(position: $position) {
      candidate {
        name
        email
      }
      url {
        private
      }
      questions {
        title
        description
        answered
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
