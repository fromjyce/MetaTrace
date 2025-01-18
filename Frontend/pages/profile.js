import Navbar from '@/components/Navbar';
import Head from 'next/head';
import ProfileCard from '@/components/ProfileCard';
import FileList from '@/components/FileList';
import Footer from '@/components/Footer';

const Profile = () => {
  const uploadedFiles = [
    { name: 'example.pdf', date: '2025-01-17', id: 1 },
    { name: 'image.jpg', date: '2025-01-16', id: 2 },
    { name: 'document.docx', date: '2025-01-15', id: 3 },
  ];
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'securepassword',
  };
  const handleSave = (updatedData) => {
    console.log('Updated User Data:', updatedData);
  };
  return (
    <>
    <Head><title>Profile | MetaTrace</title></Head>
    <div className="min-h-screen bg-[#f7f7f7ff]">
        <Navbar />
      <div className="px-9 flex flex-col py-8 justify-center">
      <section className='mb-8'>
          <ProfileCard
            name="John Doe"
            email="johndoe@example.com"
            password="password123"
            onSave={handleSave}
          />
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 epilogue">File <span className='text-[#ef4d31ff]'>History</span></h2>
          <FileList files={uploadedFiles} />
        </section>
       </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
