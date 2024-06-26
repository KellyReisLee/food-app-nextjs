import MainHeader from '@/components/Header/main-header';
import './globals.css';
import { MainHeaderBackground } from '@/components/Header/main-header-background';

export const metadata = {
  title: 'Next Food App',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeaderBackground />
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
