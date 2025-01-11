import { Badge } from "../ui/badge";
import EmailModal from "../modal/EmailModal";
import { useRef } from "react";
import { Button } from "../ui/button";

const EmailCard = ({ email }) => {
  const modalRef = useRef(null);

  const onClickModalOpen = () => {
    if (modalRef.current && modalRef.current.open) {
      modalRef.current.open();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div
        key={email.id}
        className={`p-5 rounded-lg my-3 cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-gray-200 ${
          email.status === "unread" ? "bg-gray-100" : "bg-white"
        } border border-gray-200 hover:bg-gray-50 hover:shadow-lg`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {email.sender}
              </h2>
              <p className="text-sm text-gray-500 truncate">{email.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {new Date(email.created_At).toLocaleDateString()}
            </span>
            {email.status === "unread" && (
              <Badge variant="default">Unread</Badge>
            )}
          </div>
        </div>

        <Button
          onClick={onClickModalOpen}
          className="mt-3 w-full py-2 px-4 text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          Read Email
        </Button>
      </div>

      {/* 이메일 모달을 표시하기 위한 코드 */}
      <EmailModal ref={modalRef} email={email} />
    </div>
  );
};

export default EmailCard;
