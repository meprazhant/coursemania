import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";
import connectToDatabase from "./lib/database/connect";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./components/layouts/Navbar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Academix | Home",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  connectToDatabase();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NextTopLoader color="#00ff005a" height={5} showSpinner={false} />
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
