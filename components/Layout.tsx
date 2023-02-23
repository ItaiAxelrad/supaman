import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='flex flex-col h-screen justify-start'>
      <Header />
      <main className='flex grow'>{children}</main>
      <Footer />
    </div>
  );
}
