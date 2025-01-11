import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { X, Mail, Clock, User } from "lucide-react"; // 필요한 아이콘 추가
import { Separator } from "../ui/separator";

const EmailModal = forwardRef(function EmailModal({ email }, ref) {
  const modal = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => modal.current?.showModal(),
    close: () => modal.current?.close(),
  }));

  return createPortal(
    <div>
      <dialog
        ref={modal}
        className="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white text-gray-800 rounded-lg p-6 shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl transform transition-all duration-300 ease-in-out  backdrop-blur-md border border-gray-200"
      >
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={() => ref.current?.close()}
            className="absolute text-gray-600 hover:text-gray-800 p-2 transition-all duration-300 ease-in-out rounded-full hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <Mail size={32} className="text-blue-500" />
            <h2 className="text-2xl font-extrabold text-gray-900">
              {email.title}
            </h2>
          </div>

          {/* Sender and Date */}
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-gray-500" />
              <span>{email.sender}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={18} className="text-gray-500" />
              <span> {new Date(email.created_At).toLocaleDateString()}</span>
            </div>
          </div>
          <Separator />
          {/* Email content */}
          <div className="text-gray-700 mt-4">
            <h3 className="text-lg font-medium text-gray-900">Content:</h3>
            <p className="text-base border min-h-36 p-2 my-2 rounded-e-md">
              {email.content}
            </p>
          </div>
        </div>
      </dialog>
    </div>,
    document.getElementById("modal") || document.body
  );
});

export default EmailModal;
