import { config } from "dotenv";
config(); // load .env file

export default ({ config: expoConfig }) => {
  return {
    ...expoConfig,
    extra: {
      CLIENT_ID: process.env.CLIENT_ID,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    },
  };
};
