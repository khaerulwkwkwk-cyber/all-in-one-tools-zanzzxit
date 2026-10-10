"use client";
import Sidebar from "./Sidebar";
import ReadingProgress from "./ReadingProgress";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReadingProgress />
      <div className="flex min-h-screen">
        <aside className="fixed left-0 top-0 z-30 hidden h-screen border-r border-cyan-400/10 bg-[#060b18]/80 backdrop-blur-xl lg:block">
          <Sidebar />
        </aside>
        <div className="flex min-h-screen w-full flex-col lg:pl-64">
          {children}
        </div>
      </div>
    </>
  );
}
