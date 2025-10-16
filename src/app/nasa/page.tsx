import React from 'react';
import {
  ElementSection,
  ElementsGoals,
  HeaderSection,
  MainScreenHome,
  MembersCollection,
} from '../../components';
import { ELEMENTS_GOALS, ELEMENTS_SECTIONS } from '../../constants';
import { nanoid } from 'nanoid';
import ParticleNetworkComponent from '../../components/templates/ParticleNetworkComponent';
import { FooterSection } from '../../components';
import { COMPLETE_RESOURCES_SECTION } from '../../constants';

export const metadata = {
  title: 'NASA Urban Observatory',
  description: 'Advanced Urban Planning & Space Technology Integration Platform',
};

export default function MainPage() {
  return (
    <div className="relative h-screen w-full overflow-scroll bg-black">
      {/* Particle Network Background */}
      <div className="absolute inset-0">
        <ParticleNetworkComponent
          particleColor="#3b82f6"
          background="#000000"
          interactive={true}
          speed="slow"
          density="medium"
          className="h-full w-full"
        />
      </div>

      <HeaderSection />

      <div className="relative z-30 mt-20 mb-10 flex h-full items-center justify-center px-8">
        <div className="mx-auto max-w-6xl">
          <MainScreenHome></MainScreenHome>
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {ELEMENTS_GOALS.map(goal => (
              <ElementsGoals key={nanoid()} {...goal}></ElementsGoals>
            ))}
          </div>
        </div>
      </div>
      {ELEMENTS_SECTIONS.map(element => (
        <ElementSection key={nanoid()} element={element}></ElementSection>
      ))}
      <MembersCollection></MembersCollection>
      <FooterSection>
        <FooterSection.Header />
        <FooterSection.Line />
        <FooterSection.Links collection={COMPLETE_RESOURCES_SECTION} />
      </FooterSection>
      <div className="absolute right-8 bottom-8 left-8 z-30">
        <div className="font-jetbrains flex items-end justify-between text-xs text-gray-600">
          <div>
            <div>© 2025 NASA URBAN OBSERVATORY</div>
            <div className="text-gray-700">HUAYCÁN DEVELOPMENT PROJECT</div>
          </div>
          <div className="text-right">
            <div>REAL-TIME DATA PROCESSING</div>
            <div className="text-gray-700">LAST UPDATE: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
