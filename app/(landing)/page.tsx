// import { Button } from "@/components/ui/button";
// import Link from "next/link";

import { LandingContent } from "@/components/custom/landing-content";
import { LandingHero } from "@/components/custom/landing-hero";
import { LandingNavbar } from "@/components/custom/landing-navbar";

// import React from "react";

// const LandingPage = () => {
//   return (
//     <div>
//       LandingPage
//       <div>
//         <Link href="/sign-in">
//           <Button>Login</Button>
//         </Link>
//         <Link href="/sign-up">
//           <Button>Sign Up</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

const LandingPage = () => {
  return (
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
