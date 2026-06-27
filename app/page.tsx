import CardStack from "./components/Card";
import Community from "./components/Community";
import Consider from "./components/Consider";
import CreditBuild from "./components/CreditBuild";
import Education from "./components/Education";
import FAQ from "./components/FAQ";
import Loan from "./components/Loan";
import MortgageCalculator from "./components/MortgageCalculator";
import MortgageLandingPage from "./components/MortgageLandingPage";

export default function Home() {
  return (
   <>
   <MortgageLandingPage />
   <Community/>
   {/* <Consider/> */}
   <Education/>
   <CreditBuild/>
   <MortgageCalculator/>
   <CardStack/>
   <Loan/>
   <FAQ/>
   </>
  );
}
