import Community from "./components/Community";
import FAQ from "./components/FAQ";
import MortgageCalculator from "./components/MortgageCalculator";
import MortgageLandingPage from "./components/MortgageLandingPage";

export default function Home() {
  return (
   <>
   <MortgageLandingPage />
   <Community/>
   <MortgageCalculator/>
   <FAQ/>
   </>
  );
}
