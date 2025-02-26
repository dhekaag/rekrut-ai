import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

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
      <div className="p-4 sm:p-6 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative">
            <span className="relative z-10">Frequently Asked Questing</span>
          </h2>
          <p className="text-gray-500 mt-2 sm:mt-0 text-sm">
            Temukan jawaban untuk pertanyaan umum
          </p>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6">
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
                <AccordionTrigger className="text-base sm:text-lg md:text-xl font-medium py-3 sm:py-4 hover:no-underline group">
                  <div className="flex items-start text-left hover:text-blue-600 transition-colors">
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 sm:pb-6">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-400 text-sm sm:text-base">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-6 sm:mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <HelpCircle size={16} className="text-blue-500" />
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
