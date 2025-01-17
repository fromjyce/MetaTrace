import "../app/globals.css"
import {Poppins, Epilogue} from "next/font/google";

const poppins_init = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-poppins',
});

const epilogue_init = Epilogue({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-epilogue',
});

export const metadata = {
    title: "MetaTrace",
    description: "Empowering Forensics Through Metadata Insights",
  };

function MyApp({ Component, pageProps }) {
    return (
        <div className={`${epilogue_init.variable} ${poppins_init.variable} antialiased`}>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      );
}

export default MyApp;