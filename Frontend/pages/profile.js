import Navbar from '@/components/Navbar';
import Head from 'next/head';

const Profile = () => {
  return (
    <>
    <Head><title>Profile | MetaTrace</title></Head>
    <div className="min-h-screen bg-[#f7f7f7ff]">
        <Navbar />
      <div className="container mx-auto px-4 py-8">
        Profile
       </div>
    </div>
    </>
  );
};

export default Profile;
