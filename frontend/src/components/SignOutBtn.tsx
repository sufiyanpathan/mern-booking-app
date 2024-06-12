import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-client";
// import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const SignOutBtn = () => {
  //   const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Logout Successfully!",
        type: "SUCCESS",
      });
      //   navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
