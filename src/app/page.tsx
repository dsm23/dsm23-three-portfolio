import { headers } from "next/headers";
import type { Metadata } from "next";
import ThreeFiber from "~/components/three-fiber";

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
};

const Page = async () => {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;

  return (
    <main>
      <h1 className="sr-only">Delete this</h1>
      <ThreeFiber nonce={nonce} />
    </main>
  );
};

export default Page;
