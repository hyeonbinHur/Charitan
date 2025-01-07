import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import SignInForm from "../auth/SiginInForm";
import SignUpForm from "../auth/SignUpForm";
import { Button } from "../ui/button";

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
        className="bg-white text-gray-500 rounded-lg p-6 shadow-lg w-full max-w-md"
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
            <SignInForm close={() => ref.current?.close()} />
          ) : (
            <SignUpForm toSignIn={toggleForm} />
          )}
        </section>
        <section className="mt-6 text-center">
          {isSignIn ? (
            <div>
              <h3 className="text-gray-700 mb-2">Don't have an account?</h3>
              <Button onClick={toggleForm} className="bg-blue-500 text-white">
                Sign Up
              </Button>
            </div>
          ) : (
            <div>
              <h3 className="text-gray-700 mb-2">Already have an account?</h3>
              <Button onClick={toggleForm} className="bg-blue-500 text-white">
                Sign In
              </Button>
            </div>
          )}
        </section>
      </dialog>
    </div>,
    document.getElementById("modal") || document.body
  );
});

export default AuthModal;
