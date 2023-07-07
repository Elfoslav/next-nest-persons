export const API = {
  PERSONS: {
    CREATE: `${process.env.NEXT_PUBLIC_API_URL}/persons`,
    GET_ALL: `${process.env.NEXT_PUBLIC_API_URL}/persons`,
    GET_ONE: `${process.env.NEXT_PUBLIC_API_URL}/persons/:id`,
    PATCH: `${process.env.NEXT_PUBLIC_API_URL}/persons/:id`,
    DELETE: `${process.env.NEXT_PUBLIC_API_URL}/persons/:id`,
  },
};
