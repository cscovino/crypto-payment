import { Mulish } from 'next/font/google';
import { PropsWithChildren } from 'react';

import BitnovoLogo from '../BitnovoLogo';

const mulish = Mulish({ subsets: ['latin'] });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main
        className={`flex justify-center items-center min-h-screen bg-light-white ${mulish.className}`}
      >
        {children}
      </main>
      <footer className="absolute bottom-8 w-full flex gap-4 justify-center items-center">
        <BitnovoLogo />
        <VerticalDivider />
        <span className="footer-text text-dark-500">© 2022 Bitnovo. All rights reserved.</span>
      </footer>
    </>
  );
}

function VerticalDivider() {
  return <div className="w-px h-[26px] bg-dark-500" />;
}
