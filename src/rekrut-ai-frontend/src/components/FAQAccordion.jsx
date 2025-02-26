import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FAQAccordion = () => {
  const faqItems = [
    {
      question: "Apa itu RekrutAI?",
      answer:
        "RekrutAI adalah platform interview berbasis AI yang membantu kandidat berlatih untuk wawancara kerja. Kami menyediakan simulasi wawancara yang realistis dengan analisis dan umpan balik real-time untuk membantu Anda mempersiapkan diri menghadapi wawancara kerja teknologi.",
    },
    {
      question: "Bagaimana cara kerja RekrutAI?",
      answer:
        "RekrutAI bekerja dengan menggunakan algoritma AI canggih untuk mensimulasikan wawancara. Anda akan menjawab pertanyaan seperti dalam wawancara nyata, kemudian sistem akan menganalisis jawaban Anda dan memberikan umpan balik yang konstruktif untuk perbaikan.",
    },
    {
      question: "Apakah RekrutAI gratis untuk digunakan?",
      answer:
        "RekrutAI menawarkan paket gratis dengan fitur terbatas dan paket premium dengan fitur lengkap. Paket gratis memungkinkan Anda mengakses beberapa template wawancara dasar, sementara paket premium membuka semua fitur termasuk analisis mendalam dan sesi wawancara tak terbatas.",
    },
    {
      question: "Industri atau posisi apa saja yang didukung RekrutAI?",
      answer:
        "RekrutAI mendukung berbagai posisi di industri teknologi, termasuk pengembang software, data scientist, UX designer, product manager, dan banyak lagi. Kami terus menambahkan template wawancara baru untuk berbagai posisi dan tingkat pengalaman.",
    },
    {
      question: "Bagaimana akurasi feedback dari RekrutAI?",
      answer:
        "Feedback RekrutAI dirancang berdasarkan input dari profesional HR dan technical interviewer berpengalaman. Meskipun tidak ada sistem yang sempurna, umpan balik kami sangat relevan dengan standar industri saat ini dan terus ditingkatkan melalui pembelajaran mesin.",
    },
    {
      question: "Apakah data saya aman dengan RekrutAI?",
      answer:
        "Keamanan data adalah prioritas utama kami. Semua interaksi Anda dienkripsi dan kami tidak pernah membagikan informasi pribadi Anda dengan pihak ketiga tanpa izin. Anda juga dapat menghapus data Anda kapan saja melalui pengaturan akun.",
    },
  ];

  return (
    <div className="w-full mx-auto bg-gray-50 rounded-xl overflow-hidden">
      <div className="p-6 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 relative">
            <span className="relative z-10">Frequently Asked Questing</span>
            <span className="absolute -bottom-4 left-0 w-full h-2 bg-blue-500/20 rounded-full z-0"></span>
          </h2>
          <p className="text-gray-500 mt-6 sm:mt-0 text-sm">
            Temukan jawaban untuk pertanyaan umum
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`${
                  index !== faqItems.length - 1
                    ? "border-b border-gray-100"
                    : ""
                } py-1`}
              >
                <AccordionTrigger className="text-lg md:text-xl font-medium py-4 hover:no-underline group">
                  <div className="flex items-start text-left hover:text-blue-600 transition-colors">
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="17" x2="12" y2="17"></line>
            </svg>
            <span>
              Ada pertanyaan lain?{" "}
              <Link
                to={"/"}
                className="text-blue-600 font-medium hover:underline"
              >
                Kontak kami
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
