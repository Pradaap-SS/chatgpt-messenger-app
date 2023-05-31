import "../styles/globals.css";
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { SessionProvider } from "@/providers/SessionProvider";
import Login from "@/components/Login";
import SideBar from "@/components/SideBar";
import ClientProvider from "@/providers/ClientProvider";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatGpt: AI Assitant',
  description: 'Created by Pradaap!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  console.log(session);
  
  return (
    <html lang="en">
      <head />
      <body>
      <SessionProvider session={session}>
					{!session ? (
						<Login />
					) : (
						<>
							<div className="flex md:flex">
								<div className="bg-slate-800 max-w-xs h-screen md:overflow-y-auto md:min-w-[20rem] lg:max-w-[25rem]">
									<SideBar />
								</div>

								<ClientProvider />
								<div className="bg-slate-700 flex-1">
									{children}
								</div>
							</div>
						</>
					)}
				</SessionProvider>
        </body>

    </html>
  )
}
