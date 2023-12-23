import { findUsers } from "../controllers/user";

const resolvers = {
  Query: {
    allUsers: () => {
      return findUsers();
    }
  }
};

export { resolvers }
