// RowItem.js

const RowItem = (prop) => {
  const { transaction } = prop;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const formatAmount = (amount) => {
    if (!amount) {
      amount = 0;
    }
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  return (
    <tr
      className={`hover:bg-gray-100 dark:hover:bg-gray-800 transition-transform duration-300 transform hover:md:text-base ${
        transaction.index % 2 === 0
          ? "bg-gray-50 dark:bg-gray-700"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
        {transaction.school}
      </td>
      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
        {transaction.status}
      </td>
      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
        {transaction.payment_mode}
      </td>
      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
        {formatAmount(transaction.amount)}
      </td>
      <td className="px-4 py-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
        {transaction.updatedAt !== undefined
          ? formatDate(transaction.updatedAt)
          : formatDate(new Date().toDateString())}
      </td>
    </tr>
  );
};

export default RowItem;
