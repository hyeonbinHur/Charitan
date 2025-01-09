import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { readMessages } from "../../utils/api/message";
import DonationMessageCard from "./DonationMessageCard";
const MessageAccordion = ({ project_id }) => {
  /**
   * Http Requests
   */
  const { data: messages } = useQuery({
    queryKey: [`read-project-message-${project_id}`],
    queryFn: () => readMessages(project_id),
  });
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          {messages &&
            messages.map((e) => (
              <AccordionContent key={`message-key-${e.message_id}`}>
                <DonationMessageCard message={e} />
              </AccordionContent>
            ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MessageAccordion;
