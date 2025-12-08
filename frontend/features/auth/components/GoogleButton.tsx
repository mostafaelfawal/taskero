import { auth } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { oauthLogin } from "@/store/UserSection/thunks/oauthLogin";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { FirebaseError } from "firebase/app";

// Create provider only once
const googleProvider = new GoogleAuthProvider();

export default function GoogleButton() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);

      const resultAction = await dispatch(
        oauthLogin({
          name: user.displayName ?? "Unknown User",
          email: user.email ?? "",
          avatar: user.photoURL ?? "/default-avatar.png",
        })
      );

      if (oauthLogin.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload.message);
        router.replace("/taskero/dashboard");
      } else {
        const errorMsg = resultAction.payload as string;
        toast.error(errorMsg);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            toast.error("Login cancelled");
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Check your connection.");
            break;
          default:
            toast.error("Something went wrong. Try again!");
        }
      }
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleGoogleLogin}
      className="flex justify-center items-center gap-2 border border-gray-200 dark:border-slate-700 dark:bg-slate-700 dark:text-white font-semibold rounded-lg w-full py-2.5 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-md"
    >
      {loading ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Logging in...
        </motion.p>
      ) : (
        <>
          <BsGoogle /> Google
        </>
      )}
    </button>
  );
}
