import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button"; 

export default function SignInButton() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/AuthPage"); // this is login/signup route
  };

  return (
    <Button
      onClick={handleSignIn}
      variant="default"
      size="default"
      className="flex items-center gap-2"
    >
      <CircleUser className="w-5 h-5" />
      <span>Sign In</span>
    </Button>
  );
}
