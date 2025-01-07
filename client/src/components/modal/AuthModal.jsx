import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

import { X } from "lucide-react";
import SignInForm from "../auth/SiginInForm";
import SignUpForm from "../auth/SignUpForm";
import { Button } from "../ui/button";

const AuthModal = forwardRef(function AuthModal(props, ref) {
  const modal = useRef(null);
  const [isSignIn, setIsSignIn] = useState(true);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        modal.current.showModal();
      },
      close: () => {
        modal.current.close();
      },
    };
  });
  /* need to implemente cancel sign in & sign up action */
  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  return createPortal(
    <div>
      <dialog ref={modal} className="bg-white text-gray-500">
        <div>
          <X onClick={() => ref.current.close()} />
        </div>
        <section>
          {isSignIn ? (
            <SignInForm close={() => ref.current && ref.current.close()} />
          ) : (
            <SignUpForm toSignIn={toggleForm} />
          )}
        </section>
        <section>
          {isSignIn ? (
            <div>
              <h3>To sign up</h3>
              <Button onClick={() => setIsSignIn(false)}>Sign up</Button>
            </div>
          ) : (
            <div>
              <h3>to sign in</h3>
              <Button onClick={() => setIsSignIn(true)}>Sign In</Button>
            </div>
          )}
        </section>
      </dialog>
    </div>,
    document.getElementById("modal")
  );
});

export default AuthModal;
