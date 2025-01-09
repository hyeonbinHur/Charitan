import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import SignInForm from "../auth/SiginInForm";
import SignUpForm from "../auth/SignUpForm";

const AuthModal = forwardRef(function AuthModal(props, ref) {
  const modal = useRef(null);
  const [isSignIn, setIsSignIn] = useState(true);

  useImperativeHandle(ref, () => ({
    open: () => modal.current?.showModal(),
    close: () => modal.current?.close(),
  }));

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  return createPortal(
    <div>
      <dialog
        ref={modal}
        className="top-[50%] z-50 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white text-gray-500 rounded-lg p-6 shadow-lg w-full max-w-md"
      >
        <div className="flex justify-end">
          <button
            onClick={() => ref.current?.close()}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <section className="mt-4">
          {isSignIn ? (
            <SignInForm
              close={() => ref.current?.close()}
              toggleForm={toggleForm}
            />
          ) : (
            <SignUpForm toSignIn={toggleForm} toggleForm={toggleForm} />
          )}
        </section>
      </dialog>
    </div>,
    document.getElementById("modal") || document.body
  );
});

export default AuthModal;
