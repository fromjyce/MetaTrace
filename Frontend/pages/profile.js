"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import ProfileCard from "@/components/ProfileCard";
import Footer from "@/components/Footer";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      console.log("🔍 Checking token...");
      console.log("Stored Token:", token);
      console.log(
        "Stored Expiry:",
        tokenExpiry ? new Date(Number(tokenExpiry)).toLocaleString() : "Not Found"
      );

      if (!token || !tokenExpiry) {
        console.warn("❌ No token found! Redirecting to login...");
        logoutUser();
        return;
      }

      if (Date.now() > Number(tokenExpiry)) {
        console.warn("❌ Token expired! Redirecting to login...");
        logoutUser();
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // ✅ Fetch User Data
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
        console.error("❌ Error:", error.message);
        setError(error.message);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

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
                  />
                )}
              </section>
              
              {/* ✅ Redirect User to Upload Page Instead of Uploading Here */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Upload <span className="text-red-500">File</span>
                </h2>
                <button
                  onClick={() => router.push("/upload")}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Go to Upload Page
                </button>
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
