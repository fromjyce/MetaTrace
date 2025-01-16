"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../public/metatrace.png";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div>
    <nav className="bg-gray-900 text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="MetaTrace Logo"
            width={40}
            height={40}
          />
          <div className="font-bold text-xl">MetaTrace</div>
        </div>
        <ul className="flex space-x-6 mx-auto">
          <li>
            <a
              href="#features"
              className={`hover:text-gray-400 ${
                activeSection === "features" ? "text-blue-400" : ""
              }`}
              onClick={() => setActiveSection("features")}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#steps"
              className={`hover:text-gray-400 ${
                activeSection === "steps" ? "text-blue-400" : ""
              }`}
              onClick={() => setActiveSection("steps")}
            >
              Steps
            </a>
          </li>
        </ul>
        <div className="flex space-x-4">
          <a href="/login" className="hover:text-gray-400">
            Sign In
          </a>
          <a href="/signup" className="hover:text-gray-400">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
    <section className="bg-blue-600 text-white text-center py-20">
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">Unlock the Power of Your Data with MetaTrace</h1>
      <p className="mt-4 text-xl">MetaTrace makes metadata extraction effortless, uncovering actionable insights securely and with user-friendly precision.</p>
      <a href="/signup" className="mt-6 inline-block bg-yellow-500 text-black py-2 px-6 rounded-full text-lg font-semibold">Start Analyzing Now!</a>
    </div>
  </section>
  <section id="features" className="bg-gray-100 py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4">MetaTrace's Core Offerings</h2>
    <p className="text-lg text-gray-600 mb-12">
    Transform hidden file details into stunning visuals and actionable insights with ease.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="mb-4">
          <img
            src="/landing_page/feature1.png"
            alt="Metadata Icon"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Comprehensive Metadata Extraction
        </h3>
        <p className="text-gray-600 text-sm">
        Get detailed insights from images, videos, and documents effortlessly.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="mb-4">
          <img
            src="/landing_page/feature2.png"
            alt="Visual Insights Icon"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Visualized Insights
        </h3>
        <p className="text-gray-600 text-sm">
        Turn data into sleek, presentation-ready charts and graphs.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="mb-4">
          <img
            src="/landing_page/feature3.png"
            alt="Security Icon"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Security & Privacy First
        </h3>
        <p className="text-gray-600 text-sm">
        Your files are protected with robust encryption and strict privacy measures.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="mb-4">
          <img
            src="/icons/integration-icon.svg"
            alt="Integration Icon"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Seamless Integration
        </h3>
        <p className="text-gray-600 text-sm">
        Work seamlessly across various file formats for a smooth experience.
        </p>
      </div>
    </div>
  </div>
</section>
<section id="steps" className="bg-white py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800">Effortless Insights with MetaTrace</h2>
    <p className="mt-4 text-lg text-gray-500">Begin your MetaTrace experience in no time.</p>
    
    <div className="mt-10 grid grid-cols-4 gap-8">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-16 h-16 mb-4">
          <Image src="/path/to/upload-icon.png" alt="Upload Icon" width={64} height={64} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Upload Your File</h3>
        <p className="mt-2 text-gray-600">Upload an image, video, or PDF. MetaTrace supports multiple formats for flexibility.</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-16 h-16 mb-4">
          <Image src="/path/to/analyze-icon.png" alt="Analyze Icon" width={64} height={64} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Analyze the Metadata</h3>
        <p className="mt-2 text-gray-600">Extract key details like size, creation date, and resolution instantly.</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-16 h-16 mb-4">
          <Image src="/path/to/visualize-icon.png" alt="Visualize Icon" width={64} height={64} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Visualize Key Insights</h3>
        <p className="mt-2 text-gray-600">View trends and correlations through clear, impactful visualizations.</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-16 h-16 mb-4">
          <Image src="/path/to/security-icon.png" alt="Security Icon" width={64} height={64} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Ensure Security and Privacy</h3>
        <p className="mt-2 text-gray-600">Enjoy strong encryption and privacy for complete peace of mind.</p>
      </div>
      
    </div>
  </div>
</section>

  <footer className="bg-gray-900 text-white py-2">
    <div className="container mx-auto text-center">
      <p className="text-sm">Developed with ❤️ by <strong>Team MetaTrace</strong>.</p>
    </div>
  </footer>
  </div>
  );
}
