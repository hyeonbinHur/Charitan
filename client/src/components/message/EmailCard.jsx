import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";

const EmailCard = ({ email }) => {
  return (
    <div>
      <div
        key={email.id}
        className={`p-4 rounded-lg ${
          email.status === "unread" ? "bg-gray-100" : "bg-white"
        } border hover:shadow-md transition`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              <img
                src={`https://i.pravatar.cc/150?img=${email.id}`}
                alt="avatar"
              />
            </Avatar>
            <div>
              <h2 className="font-semibold">{email.sender}</h2>
              <p className="text-sm text-gray-500">{email.subject}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">{email.time}</span>
            {email.status === "unread" && (
              <Badge variant="default">Unread</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
