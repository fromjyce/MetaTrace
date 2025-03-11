"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import ProfileCard from "@/components/ProfileCard";
import Footer from "@/components/Footer";
import FileList from "@/components/FileList";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileUploads, setFileUploads] = useState([]);
  const router = useRouter();

  const handleSave = async (updatedData) => {
    setUserData(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (!token || !tokenExpiry) {
        logoutUser();
        return;
      }

      if (Date.now() > Number(tokenExpiry)) {
        logoutUser();
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const userResponse = await fetch("/api/auth/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("Session expired. Please log in again.");
        }

        const userData = await userResponse.json();
        setUserData(userData);
      } catch (error) {
        setError(error.message);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    if (userData?.email) {
      fetchUploadedFiles();
    }
  }, [userData]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(`/api/files?email=${encodeURIComponent(userData.email)}`);
      const data = await response.json();
  
      if (response.ok) {
        setFileUploads(data.files || []);
      } else {
        console.error("❌ Fetch error:", data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching files:", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    alert("Session expired. Redirecting to login...");
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Profile | MetaTrace</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="px-9 flex flex-col py-8 justify-center">
          {loading ? (
            <p className="text-center text-gray-600">🔄 Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">⚠ {error}</p>
          ) : (
            <>
              <section className="mb-8">
                {userData && (
                  <ProfileCard
                    name={userData.name}
                    email={userData.email}
                    password="******"
                    onSave={handleSave}
                  />
                )}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 epilogue">
                  File <span className="text-[#ef4d31ff]">History</span>
                </h2>
                <FileList files={fileUploads} />
              </section>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;