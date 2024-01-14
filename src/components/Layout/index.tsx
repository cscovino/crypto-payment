import { Mulish } from 'next/font/google';
import { PropsWithChildren } from 'react';

import BitnovoLogo from '../BitnovoLogo';

const mulish = Mulish({ subsets: ['latin'] });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main
        className={`flex justify-center items-center min-h-screen min-w-screen bg-light-white pb-[calc(2rem+0.75rem+3rem)] max-sm:pb-[calc(2rem+0.75rem+5rem)] ${mulish.className}`}
      >
        {children}
      </main>
      <footer className="fixed bottom-0 pb-8 pt-3 w-full bg-light-white flex gap-4 justify-center items-center max-sm:flex-col">
        <BitnovoLogo />
        <div className="max-sm:hidden">
          <VerticalDivider />
        </div>
        <span className="footer-text text-dark-500">© 2022 Bitnovo. All rights reserved.</span>
      </footer>
    </>
  );
}

function VerticalDivider() {
  return <div className="w-px h-[26px] bg-dark-500" />;
}
