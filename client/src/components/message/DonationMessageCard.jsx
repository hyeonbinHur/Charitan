import { Avatar } from "@radix-ui/react-avatar";

const DonationMessageCard = ({ message }) => {
  return (
    <div className="flex items-start p-4 bg-gray-300 shadow-md rounded-lg">
      {/* Avatar Section */}
      {/* Content Section */}
      <Avatar className="w-10 h-10">
        <img
          className="rounded-full"
          src={`https://i.pravatar.cc/150?img=$%7Bemail.id%7D`}
          alt="avatar"
        />
      </Avatar>
      <div className="ml-4">
        {/* Donor Email */}
        <div className="text-sm font-semibold text-gray-800">
          {message.donor_email}
        </div>
        {/* Message Content */}
        <p className="mt-1 text-sm text-gray-600">{message.content}</p>
      </div>
    </div>
  );
};

export default DonationMessageCard;
