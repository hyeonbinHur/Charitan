const DonationMessageCard = ({ message }) => {
  return (
    <div className="flex items-start p-4 bg-gray-300 shadow-md rounded-lg">
      {/* Avatar Section */}
      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full"></div>
      {/* Content Section */}
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
