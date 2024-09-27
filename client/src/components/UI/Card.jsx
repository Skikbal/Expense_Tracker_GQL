import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib/formatDate";
import toast from "react-hot-toast";
const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutation/transaction.mutation";

const Card = ({ transaction }) => {
  const cardClass = categoryColorMap[transaction.category];
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
  });

  const handleDelete = async (id) => {
    try {
      await deleteTransaction({
        variables: {
          transactionId: id,
        },
      });
      toast.success("Transaction deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {transaction.category}
          </h2>
          <div className="flex items-center gap-2">
            {!loading ? (
              <FaTrash
                className="cursor-pointer"
                onClick={() => handleDelete(transaction._id)}
              />
            ) : (
              <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
            )}

            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1 capitalize">
          <BsCardText />
          Description: {transaction.description}
        </p>
        <p className="text-white flex items-center gap-1 capitalize">
          <MdOutlinePayments />
          Payment Type: {transaction.paymentType}
        </p>
        <p className="text-white flex items-center gap-1 capitalize">
          <FaSackDollar />
          Amount: {transaction.amount}
        </p>
        <p className="text-white flex items-center gap-1 capitalize">
          <FaLocationDot />
          Location: {transaction.location}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">
            {formatDate(transaction.date)}
          </p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
