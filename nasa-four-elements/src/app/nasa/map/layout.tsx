import React from "react";

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export const metadata = {
  title: "Movie Ticket App",
  description: "A movie ticket booking application",
};

export default function IntroLayout({ children }: Props) {
  return <>{children}</>;
}
