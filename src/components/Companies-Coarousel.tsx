import Company1 from "@/assets/images/companies/company-1.png";
import Company2 from "@/assets/images/companies/company-2.webp";
import Company3 from "@/assets/images/companies/company-3.webp";
import Company4 from "@/assets/images/companies/company-4.webp";
import Company5 from "@/assets/images/companies/company-1.png";
import Company6 from "@/assets/images/companies/company-1.png";

const logos = [Company1, Company2, Company3, Company4, Company5, Company6];

export function CompaniesCarousel() {
  return (
    <div className="relative overflow-hidden py-6">
      <div className="flex w-max animate-infinite-scroll whitespace-nowrap">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="mx-8 flex-shrink-0">
            <img
              src={logo}
              alt={`Company logo ${index}`}
              className="h-12 w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
