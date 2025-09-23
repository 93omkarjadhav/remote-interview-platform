// "use client";

// import { ClerkProvider, useAuth } from "@clerk/nextjs";
// import { ConvexReactClient } from "convex/react";
// import { ConvexProviderWithClerk } from "convex/react-clerk";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// function ConvexClerkProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} {...({ tokenCache: { template: "convex" } } as any)}>
//       <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
//         {children}
//       </ConvexProviderWithClerk>
//     </ClerkProvider>
//   );
// }

// export default ConvexClerkProvider;

"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useEffect } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function DebugAuthLogger() {
  const { isLoaded, isSignedIn, userId, sessionId } = useAuth();

  useEffect(() => {
    console.log("🔍 Clerk Auth Debug =>", {
      isLoaded,
      isSignedIn,
      userId,
      sessionId,
    });
  }, [isLoaded, isSignedIn, userId, sessionId]);

  return null; // renders nothing
}

function ConvexClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      {...({ tokenCache: { template: "convex" } } as any)}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <DebugAuthLogger />
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClerkProvider;
