import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import HallPage from "./pages/HallPage";
import SpecialtyPage from "./pages/SpecialtyPage";
import GamePage from "./pages/GamePage";
import ParentPage from "./pages/ParentPage";
import TeacherPage from "./pages/TeacherPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/hall"} component={HallPage} />
      <Route path={"/specialty"} component={SpecialtyPage} />
      <Route path={"/game"} component={GamePage} />
      <Route path={"/parent"} component={ParentPage} />
      <Route path={"/teacher"} component={TeacherPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: Cool English Cosmos - Deep Space Minimalism Theme
// - Dark mode only: defaultTheme="dark"
// - Color palette defined in index.css with OKLCH format
// - Glass morphism and cosmic animations throughout

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
