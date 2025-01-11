import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
import Loader from "../Loader";
import Header from "../Header";
// import jwt from "jsonwebtoken";

// const statusConst = {
//   success: "SUCCESS",
//   failure: "FAILURE",
//   pending: "PENDING",
//   all: "All",
// };

const Home = () => {
  const rowLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const apiCall = async () => {
      const res = await fetch("http://localhost:3000/");
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setIsLoading(false);
        setTransactions(data.transactions);
        setFilteredTransactions(data.transactions); // Set filtered transactions initially to all transactions
      }
    };

    apiCall();
  }, []);

  // Function to handle page change
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // Function to handle status filter change

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    if (selectedStatus === "SUCCESS") {
      const filtered = transactions.filter(
        (transaction) => transaction.status === "SUCCESS"
      );
      setFilteredTransactions(filtered); // Filter transactions based on status
    } else if (selectedStatus === "PENDING") {
      const filtered = transactions.filter(
        (transaction) => transaction.status === "PENDING"
      );
      setFilteredTransactions(filtered); // Filter transactions based on status
    } else if (selectedStatus === "FAILURE") {
      const filtered = transactions.filter(
        (transaction) => transaction.status === "FAILURE"
      );
      setFilteredTransactions(filtered); // Filter transactions based on status
    } else {
      setFilteredTransactions(transactions);
    }
    setCurrentPage(1); // Reset to first page when filter is applied
  };

  // Get the current page's data slice
  const startIndex = (currentPage - 1) * rowLimit;
  const displayedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + rowLimit
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / rowLimit);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`min-h-screen flex items-center justify-center ${
            isLoading ? "" : "bg-gray-100 dark:bg-gray-900"
          } py-6 transition-colors duration-300`}
        >
          <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mx-6 transition-colors duration-300">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center">
                <label
                  htmlFor="statusFilter"
                  className="mr-2 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                >
                  Filter by Status:
                </label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="px-4 py-2 border rounded bg-white dark:bg-gray-700 text-sm sm:text-base text-gray-800 dark:text-gray-200 transition-colors duration-300"
                >
                  <option value="All">All</option>
                  <option value="SUCCESS">Success</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILURE">Failure</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-800 text-white dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm sm:text-base">
                      Collect ID
                    </th>
                    <th className="px-4 py-2 text-left text-sm sm:text-base">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-sm sm:text-base">
                      Payment Method
                    </th>
                    <th className="px-4 py-2 text-left text-sm sm:text-base">
                      Gateway
                    </th>
                    <th className="px-4 py-2 text-left text-sm sm:text-base">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-sm sm:text-base">
                      Bank Ref
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedTransactions.map((transaction, index) => (
                    <tr
                      key={transaction._id}
                      className={`hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ${
                        index % 2 === 0
                          ? "bg-gray-50 dark:bg-gray-700"
                          : "bg-white dark:bg-gray-800"
                      }`}
                    >
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                        {transaction.collect_id}
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                        {transaction.status}
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                        {transaction.payment_method}
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                        {transaction.gateway}
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                        ${transaction.transaction_amount}
                      </td>
                      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                        {transaction.bank_refrence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center p-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors duration-300"
                >
                  Next
                </button>
              </div>

              <span className="mt-2 sm:mt-0 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
