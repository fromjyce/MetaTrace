import Navbar from '@/components/Navbar';
import Head from 'next/head';

const Upload = () => {
  return (
    <>
    <Head><title>Upload your File | MetaTrace</title></Head>
    <div className="min-h-screen bg-[#f7f7f7ff]">
        <Navbar />
      <div className="container mx-auto px-4 py-8">
        Upload
       </div>
    </div>
    </>
  );
};

export default Upload;
