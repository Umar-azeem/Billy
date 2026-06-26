import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LoanProgramsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] p-2">
      <div className="bg-[#006132] text-white py-16 px-4 rounded-2xl">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold pt-6">Loan Programs</h1>
          <p className="text-green-200 mt-2 py-2">
            Find the perfect mortgage solution for your needs
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}