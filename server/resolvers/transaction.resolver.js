import Transaction from "../model/transaction.model.js";
import User from "../model/user.model.js";
const transactionResolver = {
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        throw new Error("Error getting transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (err) {
        throw new Error("Error getting transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (err) {
        throw new Error("Error getting transaction");
      }
    },
  },
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        throw new Error("Error getting transaction");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        return await Transaction.findById(transactionId);
      } catch (err) {
        throw new Error("Error getting transaction");
      }
    },
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");

      const userId = context.getUser()._id;
      const transaction = await Transaction.find({ userId });
      const categoryMap = {};

      transaction.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },
  Transaction: {
    user: async (parent) => {
      const userId = parent.userId;

      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

export default transactionResolver;
