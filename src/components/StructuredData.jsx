import React from 'react';

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",    "name": "Abu Zar Mishwani",
    "alternateName": ["Abuzar Mishwani", "Mishwani", "Mufasa"],
    "url": "https://mishwani.is-a.dev/",
    "image": "https://mishwani.is-a.dev/images/abu-zar.mishwani.webp",
    "description": "Software Engineer and Tech Entrepreneur from Chitral, Pakistan. Founder & CEO of HindukushSoft Technologies, creator of TechABU blog and Spot Web Tools platform with 190+ free SEO tools.",
    "jobTitle": "Software Engineer and Tech Entrepreneur",
    "birthDate": "2000-08-24",
    "birthPlace": {
      "@type": "Place",
      "name": "Chitral, Pakistan",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chitral",
        "addressRegion": "Khyber Pakhtunkhwa",
        "addressCountry": "Pakistan"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Drosh, Chitral",
      "addressRegion": "Khyber Pakhtunkhwa",
      "addressCountry": "Pakistan"
    },
    "nationality": "Pakistan",
    "gender": "Male",
    "telephone": "+923229953031",
    "email": "ceo@hindukushsoft.com",    "worksFor": {
      "@type": "Organization",
      "name": "HindukushSoft Technologies Pvt. Ltd.",
      "url": "https://www.hindukushsoft.com/"
    },
    "sameAs": [
      "https://www.facebook.com/abuzar.mishwani/",
      "https://www.x.com/itsabuzarr",
      "https://www.instagram.com/mishwani7/",      
      "https://www.linkedin.com/in/mishwani7/",
      "https://github.com/mishwani7",
      "https://mishwani.is-a.dev/",
      "http://techabu.co/"
    ],
    "knowsAbout": [
      "Web Development",
      "SEO",
      "Software Development",
      "WordPress",
      "React",
      "PHP",
      "Laravel",
      "JavaScript",
      "HTML",
      "CSS",
      "Android App Development",
      "Content Writing",
      "Digital Marketing",
      "Entrepreneurship"
    ],    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Engineer and Tech Entrepreneur",
      "description": "Full-stack software engineer specializing in web development, SEO, and digital solutions. Founder and CEO of HindukushSoft Technologies, building innovative software solutions and leading technology initiatives in Pakistan.",
      "occupationLocation": {
        "@type": "City",
        "name": "Chitral, Pakistan"
      },
      "skills": [
        "Full Stack Development",
        "Web Development",
        "SEO",
        "Software Engineering",
        "App Development",
        "Content Writing"
      ],      "estimatedSalary": [
        {
          "@type": "MonetaryAmountDistribution",
          "name": "base",
          "currency": "USD",
          "duration": "P1Y",
          "percentile10": 25000,
          "percentile25": 35000,
          "median": 45000,
          "percentile75": 55000,
          "percentile90": 65000
        }
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "url": "https://mishwani.is-a.dev/",
        "lastReviewed": "2025-06-13"
      }
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "University of Chitral",
        "description": "BS in Computer Science (2020-2024)"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Government Higher Secondary School Drosh",
        "description": "ICS (Intermediate in Computer Science)"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Drosh Public School and College",
        "description": "Matriculation"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Google IT Support Certification"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "SEO Specialization Certification"
      }    ],
    "owns": [
      {
        "@type": "WebSite",
        "name": "Abu Zar Mishwani - Personal Portfolio",
        "url": "https://mishwani.is-a.dev/",
        "author": {
          "@type": "Person",
          "name": "Abu Zar Mishwani"
        }
      },
      {
        "@type": "Blog",
        "name": "TechABU Blog",
        "url": "http://techabu.co/",
        "description": "Technology blog covering SEO tips, programming concepts, WordPress tricks, and AI tools"
      },      {
        "@type": "WebSite",
        "name": "Spot Web Tools",
        "url": "https://spotwebtools.com/",
        "description": "Platform with 190+ free SEO and web tools, available as web app and Android app"
      },      {
        "@type": "MobileApplication",
        "name": "GPA Calculator & Planner",
        "description": "Android app for students to track semester performance and CGPA",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Android",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "200",
          "bestRating": "5",
          "worstRating": "1"
        }
      }],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Al-Khidmat Foundation Chitral",
        "description": "Volunteer providing IT support and digital activity management"
      },      {
        "@type": "ProfessionalService",
        "name": "KPITB Internship Program",
        "description": "Internship program under Khyber Pakhtunkhwa Information Technology Board",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Peshawar",
          "addressRegion": "Khyber Pakhtunkhwa",
          "addressCountry": "Pakistan"
        }
      }
    ],
    "award": [
      "Selected for government project to write official Chitral Gazetteer",
      "KPITB internship program participant",
      "Google IT Support Certification",
      "SEO Specialization Certification"
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "url": "https://mishwani.is-a.dev/"
    },
    "subjectOf": {
      "@type": "WebPage",
      "url": "https://mishwani.is-a.dev/",
      "name": "Abu Zar Mishwani - Personal Biography"
    }
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "HindukushSoft Technologies Pvt. Ltd.",
            "url": "https://www.hindukushsoft.com/",
            "description": "Software development company providing web development, app development, and IT services",
            "founder": {
              "@type": "Person",
              "name": "Abu Zar Mishwani",
              "url": "https://mishwani.is-a.dev/"
            },            "location": {
              "@type": "Place",
              "name": "Chitral, Pakistan",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chitral",
                "addressRegion": "Khyber Pakhtunkhwa",
                "addressCountry": "Pakistan"
              }
            },
            "foundingDate": "2025"          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Abu Zar Mishwani - Software Engineer & Tech Entrepreneur",
            "alternateName": "Abu Zar Mishwani Portfolio",
            "url": "https://mishwani.is-a.dev/",
            "description": "Personal portfolio of Abu Zar Mishwani - Software Engineer, Tech Entrepreneur, and Founder of HindukushSoft Technologies from Chitral, Pakistan",
            "author": {
              "@type": "Person",
              "name": "Abu Zar Mishwani",
              "url": "https://mishwani.is-a.dev/"
            },
            "publisher": {
              "@type": "Person",
              "name": "Abu Zar Mishwani"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mishwani.is-a.dev/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@type": "Person",
              "name": "Abu Zar Mishwani"
            },
            "url": "https://mishwani.is-a.dev/",
            "name": "Abu Zar Mishwani",
          })
        }}
      />
    </>
  );
};

export default StructuredData;
