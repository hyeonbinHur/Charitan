import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import DonationMessageCard from "./DonationMessageCard";
import { getDonationsByProject } from "../../utils/api/donation";

const MessageAccordion = ({ project_id }) => {
  /**
   * Http Requests
   */
  const { data: messages } = useQuery({
    queryKey: [`read-project-message-${project_id}`],
    queryFn: () => getDonationsByProject(project_id),
  });
  return (
    <div>
      {messages && messages.length > 0 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Donation History</AccordionTrigger>
            {messages &&
              messages.map((e) => (
                <AccordionContent key={`message-key-${e.donation_id}`}>
                  <DonationMessageCard message={e} />
                </AccordionContent>
              ))}
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default MessageAccordion;
