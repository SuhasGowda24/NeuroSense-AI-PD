import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function SignOutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (userId) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
      }
    // clear local auth keys
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    // navigate to home
    navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="default" size="default" className="flex items-center gap-2">
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </Button>
  );
}
