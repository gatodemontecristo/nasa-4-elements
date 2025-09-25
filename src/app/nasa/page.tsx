import ParticleNetworkComponent from "@/components/atoms/ParticleNetworkComponent";
import React from "react";

export const metadata = {
  title: "NASA App",
  description: "A NASA-themed application with particle network",
};

export default function MainPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900  to-black">
      {/* Particle Network Background */}
      <div className="absolute inset-0">
        <ParticleNetworkComponent
          particleColor="#ffffff"
          background="transparent"
          interactive={true}
          speed="medium"
          density="high"
          className="w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex items-center justify-center h-full p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
            NASA 4 Elements
          </h1>
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-xl p-8 text-white border border-gray-600">
            <h2 className="text-3xl font-semibold mb-6 text-blue-300">
              Interactive Particle Network
            </h2>
            <p className="text-lg leading-relaxed mb-4 text-gray-200">
              Experience the beauty of space with our interactive particle
              network. Move your mouse to interact with the cosmic particles and
              watch them connect.
            </p>
            <p className="text-sm text-gray-400">
              Click and drag to create new interactive particles in the network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
