import { Avatar } from "@radix-ui/react-avatar";
import { Separator } from "../ui/separator";

const DonationMessageCard = ({ message }) => {
  return (
    <div className="w-full mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-300 text-gray-600">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <Avatar className="w-14 h-14">
          <img
            className="rounded-full border-2 border-blue-500 shadow-md"
            src={`https://i.pravatar.cc/150?img=$%7Bemail.id%7D}`}
            alt="avatar"
          />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {message.name}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(message.donation_date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Separator className="my-3" />
      {/* Message Section */}
      <div className="mt-4">
        <p className="text-base text-gray-800">{message.message}</p>
      </div>
      {/* Donation Info Section */}
      <div className="mt-4 items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-3">
          <p className="font-medium text-gray-800">Amount</p>
          <p className="text-lg font-semibold text-green-500">
            ${message.amount}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-medium text-gray-800">Action</p>
          <p className="text-blue-600">{message.action}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationMessageCard;
