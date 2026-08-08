import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Home - Landing Page
 * Redirects to Hall Page (星辰啟航)
 */
export default function Home() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Redirect to hall page
    navigate("/hall");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🌟</div>
        <p className="text-muted-foreground">正在進入星辰啟航...</p>
      </div>
    </div>
  );
}
