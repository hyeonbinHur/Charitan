// Shadcn Components
import EmailCard from "../components/message/EmailCard";
import { ScrollArea } from "../components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

const CharityEmaikInbox = () => {
  const { data: emails } = useQuery({
    queryKey: ["getCharities"],
    queryFn: () => getCharities(),
  });
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">📥 Inbox</h1>
      </div>

      {/* Email List */}
      <ScrollArea className="space-y-4 max-h-[80vh]">
        {emails.map((email) => (
          <EmailCard key={email.id} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default CharityEmaikInbox;
