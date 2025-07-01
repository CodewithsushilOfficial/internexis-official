import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const Partners: React.FC = () => {
  const partners = [
    {
      name: "AICTE",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png",
    },
    {
      name: "Google",
      logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    },
    {
      name: "Microsoft",
      logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
    },
    {
      name: "HCL Technologies",
      logo: "https://www.hcltech.com/themes/custom/hcltech/images/hcltech-new-logo.svg",
    },
    {
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      name: "Ministry of Technical Education",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
    },
    {
      name: "ISO Certified",
      logo: "https://iili.io/3jSsNhg.png",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Authorized & Our Esteemed Partners
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Backed by industry leaders and recognized authorities
          </p>
        </div>

        <div className="relative">
          {/* Gradient overlays for infinite scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-10"></div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            speed={2000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="partner-swiper"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="h-24 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Internexis is proud to be associated with these industry leaders
          </p>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </section>
  );
};
