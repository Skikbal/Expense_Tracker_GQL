import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import Transaction from "../model/transaction.model.js";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new error("All fields are required");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const ProfilePic = `https://avatar.iran.liara.run/public/${gender}?username=${username}`;

        const newUser = new User({
          username: username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: ProfilePic,
        });
        console.log(newUser);

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.log("Error in signup", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        await context.login(user);
        return user;
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logout successfully" };
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser:", err);
        throw new Error("Internal server Error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in authUser:", err);
        throw new Error(err.message || "Internal server Error");
      }
    },
  },
  User: {
    transactions: async (parent, _, __) => {
      try {
        const transaction = await Transaction.find({ userId: parent._id });
        return transaction;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

export default userResolver;
