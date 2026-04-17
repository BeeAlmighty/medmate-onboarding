// App.tsx
import { Routes, Route } from "react-router-dom"; // Import standard Routes/Route
import { LoyaltyTerminal } from "./pages/LoyaltyTerminal";
import OnboardingFlow from "./OnboardingFlow.tsx";

export default function App() {
  return (
    <Routes>
      {/* Patient-Facing Route */}
      <Route
        path="/"
        element={<OnboardingFlow />}
      />

      {/* Staff-Facing Route */}
      <Route
        path="/terminal"
        element={<LoyaltyTerminal />}
      />
    </Routes>
  );
}
