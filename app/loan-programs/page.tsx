// app/loan-programs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import { loanPrograms } from "@/app/data/loanPrograms";

export default function LoanProgramsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const program = searchParams.get("program");
    if (program) {
      setSelectedId(program);
    }
  }, [searchParams]);

  const selectedProgram = loanPrograms.find((p) => p.id === selectedId);

  const handleProgramClick = (id: string) => {
    setSelectedId(id);
    router.push(`/loan-programs?program=${id}`);
  };

  const clearSelection = () => {
    setSelectedId(null);
    router.push("/loan-programs");
  };

  // Get icon component
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Shield: Icons.Shield,
      Star: Icons.Star,
      Building: Icons.Building,
      Home: Icons.Home,
      RefreshCw: Icons.RefreshCw,
      LineChart: Icons.LineChart,
      TrendingDown: Icons.TrendingDown,
      FileText: Icons.FileText,
      Users: Icons.Users,
      CreditCard: Icons.CreditCard,
      Lock: Icons.Lock,
      TrendingUp: Icons.TrendingUp,
    };
    return icons[iconName] || Icons.HelpCircle;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        {!selectedProgram ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {loanPrograms.map((program) => {
                const Icon = getIcon(program.icon);
                return (
                  <div
                    key={program.id}
                    onClick={() => handleProgramClick(program.id)}
                    className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-[#006132] transition-all cursor-pointer group active:scale-[0.98] touch-manipulation"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 mb-2 sm:mb-3">
                      <div className="p-2 bg-[#006132]/10 rounded-lg flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#006132]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#006132] transition text-sm sm:text-base">
                          {program.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-0.5 sm:mt-1">
                          {program.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-[#006132] text-xs sm:text-sm font-medium">
                      Learn More
                      <Icons.ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Hint - Show on small screens */}
            <p className="text-center text-gray-500 text-xs mt-6 md:hidden">
              Tap any program to learn more
            </p>
          </>
        ) : (
          // Detail View - Mobile Optimized
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 relative animate-fadeIn">
            {/* Close Button - Mobile Friendly */}
            <button
              onClick={clearSelection}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition p-1 sm:p-2 touch-manipulation"
              aria-label="Close details"
            >
              <Icons.X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Back Button - Mobile Optimized */}
            <button
              onClick={clearSelection}
              className="inline-flex items-center text-[#006132] hover:text-[#004d26] font-medium mb-4 sm:mb-6 transition group text-sm sm:text-base"
            >
              <Icons.ArrowLeft className="w-4 h-4 mr-1 sm:mr-2 group-hover:-translate-x-1 transition" />
              Back to All Programs
            </button>

            {/* Program Header - Mobile Optimized */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-[#006132]/10 rounded-full flex-shrink-0">
                {(() => {
                  const Icon = getIcon(selectedProgram.icon);
                  return <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#006132]" />;
                })()}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
                  {selectedProgram.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-0.5 sm:mt-1">
                  {selectedProgram.subtitle}
                </p>
              </div>
            </div>

            {/* CTA Button - Mobile Full Width */}
            <Link href={selectedProgram.ctaLink} className="block">
              <button className="w-full sm:w-auto bg-[#006132] hover:bg-[#004d26] text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition mb-6 sm:mb-8 text-sm sm:text-base">
                {selectedProgram.ctaText}
              </button>
            </Link>

            {/* What is this loan? */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                What are {selectedProgram.title}?
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {selectedProgram.longDescription}
              </p>
            </div>

            {/* Key Benefits - Mobile Optimized */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Key Benefits
              </h2>
              <ul className="space-y-2">
                {selectedProgram.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                    <Icons.CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#006132] flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mt-2 sm:mt-3 text-xs sm:text-sm">
                - Billy Watkins - Sr Mortgage Broker - NMLS 384700
              </p>
            </div>

            {/* How to Apply - Mobile Stacked */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                How to Apply for {selectedProgram.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {selectedProgram.steps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-[#006132] mb-1 sm:mb-2">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials - Mobile Optimized */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Success Stories with Billy Watkins
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {selectedProgram.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                    <p className="text-sm sm:text-base text-gray-700 italic mb-2">
                      "{testimonial.text}"
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedProgram.title} Client with Billy Watkins
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs - Mobile Optimized */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {selectedProgram.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* On This Page Navigation - Mobile Scrollable */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                On This Page
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm overflow-x-auto pb-2">
                <span className="text-[#006132] whitespace-nowrap">What are {selectedProgram.title}?</span>
                <span className="text-gray-400">•</span>
                <span className="text-[#006132] whitespace-nowrap">Key Benefits</span>
                <span className="text-gray-400">•</span>
                <span className="text-[#006132] whitespace-nowrap">How to Apply</span>
                <span className="text-gray-400">•</span>
                <span className="text-[#006132] whitespace-nowrap">Testimonials</span>
                <span className="text-gray-400">•</span>
                <span className="text-[#006132] whitespace-nowrap">FAQs</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @media (max-width: 640px) {
          .touch-manipulation {
            touch-action: manipulation;
          }
        }
      `}</style>
    </div>
  );
}