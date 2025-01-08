// Shadcn Components
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
// 더미 데이터
const emails = [
  {
    id: 1,
    sender: "john.doe@example.com",
    subject: "Meeting Reminder",
    time: "10:30 AM",
    status: "unread",
  },
  {
    id: 2,
    sender: "jane.smith@example.com",
    subject: "Project Update",
    time: "Yesterday",
    status: "read",
  },
  {
    id: 3,
    sender: "support@company.com",
    subject: "Account Activation",
    time: "2 days ago",
    status: "unread",
  },
];

const Inbox = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">📥 Inbox</h1>
      </div>

      {/* Email List */}
      <ScrollArea className="space-y-4 max-h-[80vh]">
        {emails.map((email) => (
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
        ))}
      </ScrollArea>
    </div>
  );
};

export default Inbox;
