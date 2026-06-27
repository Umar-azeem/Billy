"use client";
import Image from "next/image";
import Link from "next/link";

interface SocialIcon {
  id: string;
  src: string;
  alt: string;
  url: string;
}

const Loan: React.FC = () => {
  const socialIcons: SocialIcon[] = [
    {
      id: "facebook",
      src: "https://api.iconify.design/flowbite:facebook-solid.svg?color=%23000000",
      alt: "Facebook",
      url: "https://facebook.com/BillyWatkinsMortgage",
    },
    {
      id: "instagram",
      src: "https://api.iconify.design/famicons:logo-instagram.svg?color=%23000000",
      alt: "Instagram",
      url: "https://instagram.com/BillyWatkinsMortgage",
    },
    {
      id: "linkedin",
      src: "https://api.iconify.design/uim:linkedin-alt.svg?color=%23000000",
      alt: "LinkedIn",
      url: "https://linkedin.com/in/BillyWatkinsMortgage",
    },
    {
      id: "google",
      src: "https://api.iconify.design/ion:logo-google.svg?color=%23000000",
      alt: "Google",
      url: "https://share.google/58EeohLOQ10kKQ6Y2",
    },
  ];

  return (
    <section className="bg-[#f5f5f5] py-12 px-4 sm:py-16 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="text-center lg:text-left">
          <p className="text-green-800 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold mb-4 text-sm sm:text-base">
            Let{`'`}s Get Started!
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-gray-900">
            Ready To Apply For Your Home Loan?
          </h1>

          <p className="mt-6 sm:mt-8 text-gray-800 text-sm sm:text-md leading-relaxed max-w-xl mx-auto lg:mx-0">
            Your path to ownership is just one click away! Schedule a
            complimentary consultation now so we can take a look at your
            specific needs and find the perfect home loan for you.
          </p>

          <Link href="/contact-us">
            {" "}
            <button
              className="mt-8 sm:mt-10 inline-flex items-center gap-3 bg-[#006132] hover:bg-[#006132]/80 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition mx-auto lg:mx-0"
              type="button"
            >
              Schedule Intro Call
            </button>
          </Link>
        </div>

        <div className="flex flex-col justify-center mt-16 sm:mt-20 lg:mt-0">
          <div className="w-full relative ">
            <div className="flex absolute flex-col items-end gap-1.5 top-36 left-52">
                  <div className="flex flex-col items-start gap-1 ">
                  <div className="h-4 w-4 bg-white rounded-full" />
                  <div className="h-3 w-3 bg-white rounded-full" />
                  <div className="h-2 w-2 bg-white rounded-full" />
                  <div className="h-1 w-1 bg-white rounded-full" />

                </div>
              </div>
            <div className="w-full max-w-[500px] aspect-[4/5] h-[350px] bg-[#006132] rounded-[20px]" />
            <Image
              src="/img/billyN.png"
              alt="Advisor"
              width={480}
              height={680}
              className="absolute bottom-[2px] h-[100%] w-full max-w-[880px] object-contain object-bottom sm:h-[880px] sm:w-[480px] rounded-[20px]"
              priority
              unoptimized
            />
            <div className="md:hidden  absolute top-6 md:bottom-1 md:top-40 left-42 -translate-x-1/2 sm:left-20 sm:translate-x-0  sm:top-1/2 sm:-translate-y-1/2 bg-white rounded-[24px] sm:rounded-[30px] border-white shadow-4xl p-5 sm:p-8 w-[68%] sm:w-[300px]">
              
              <h3 className="text-lg sm:text-xl font-bold text-black">
                Billy Watkins
              </h3>

              <p className="text-gray-800 mt-2 text-xs">
                Senior Mortgage Advisor
              </p>

              <p className="text-gray-800 text-xs mt-2">NMLS ID: 384700</p>
            </div>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            {socialIcons.map((icon) => (
              <a
                key={icon.id}
                href={icon.url} // Dynamically linking to the profile
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-green-700 transition group"
                aria-label={icon.alt}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={20}
                  height={20}
                  className="w-5 h-5 group-hover:brightness-0 group-hover:invert transition-all"
                  unoptimized
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loan;
