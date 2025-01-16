import "./globals.css";
import {Poppins, Urbanist} from "next/font/google";

const poppins_init = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-poppins',
});

const urbanist_init = Urbanist({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-urbanist',
});

export const metadata = {
  title: "MetaTrace",
  description: "Empowering Forensics Through Metadata Insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist_init.variable} ${poppins_init.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
