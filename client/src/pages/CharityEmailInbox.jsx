// Shadcn Components
import EmailCard from "../components/message/EmailCard";
import { ScrollArea } from "../components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { readEmails } from "../utils/api/email";
import { useParams } from "react-router-dom";

const CharityEmaikInbox = () => {
  const params = useParams();
  const { data: emails } = useQuery({
    queryKey: [`get-emails-${params.charity_id}`],
    queryFn: () => readEmails("Charity", params.charity_id),
  });
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">📥 Inbox</h1>
      </div>

      {/* Email List */}
      {emails && (
        <ScrollArea className="space-y-4 max-h-[80vh]">
          {emails.map((email) => (
            <EmailCard key={email.id} email={email} />
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default CharityEmaikInbox;
