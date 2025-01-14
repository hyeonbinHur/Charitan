import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
// import { X } from "lucide-react"; // 필요한 아이콘 추가
import { Separator } from "../ui/separator";
import LoadingSpinner from "../../../public/LoadingSpinner.svg";
const LoadingModal = forwardRef(function LoadingModal(props, ref) {
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
          {/* <button
            onClick={() => ref.current?.close()}
            className="absolute text-gray-600 hover:text-gray-800 p-2 transition-all duration-300 ease-in-out rounded-full hover:bg-gray-200"
          >
            <X size={24} />
          </button> */}
        </div>
        {/* Modal content */}
        <div className="space-y-6">
          {/* Sender and Date */}
          <div className="flex items-center space-x-6 text-gray-600">
            <img src={LoadingSpinner} />
          </div>
          <Separator />
          {/* Email content */}
          <div className="text-gray-700 mt-4"></div>
        </div>
      </dialog>
    </div>,
    document.getElementById("modal") || document.body
  );
});

export default LoadingModal;
