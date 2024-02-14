import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextUIProv } from "@/providers/NextUIProv";
import NavMenu from "@/components/NavMenu";
import StarsCanvas from "@/providers/StarBackground";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "$unil Humanabad",
    description: "Sunil humanabad's portfolio webpage",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className='dark'>
            <body className={poppins.className}>
                <NextUIProv>
                    <StarsCanvas />
                    <NavMenu />
                    {children}
                </NextUIProv>
            </body>
        </html>
    );
}
