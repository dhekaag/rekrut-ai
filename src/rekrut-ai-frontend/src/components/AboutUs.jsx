import BadgeButton from "./Fragments/BadgeButton";
import { aboutUsData } from "@/constants/aboutUsData";

export default function AboutUs() {
  return (
    <>
      <div className="w-full py-8 md:py-12 lg:py-16">
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 text-center flex flex-col items-center mb-8">
          <h1 className="font-bold text-3xl md:text-4xl mb-4">About Us</h1>
          <BadgeButton />
          <p className="text-xs md:text-sm max-w-3xl mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni quae
            culpa quaerat adipisci suscipit nam et cupiditate illum? Perferendis
            repellendus libero ut inventore illum iure necessitatibus animi
            ratione rerum quisquam?
          </p>
        </div>

        <div className="flex flex-wrap">
          {aboutUsData.map((e, i) => (
            <div
              className="flex gap-2 w-full sm:w-1/2 py-2 px-4 sm:px-6 md:px-8 lg:px-10 mb-4"
              key={i}
            >
              <div className="flex-shrink-0">img</div>
              <div>
                <h2 className="font-semibold text-lg md:text-xl mb-1">
                  {e.title}
                </h2>
                <p className="text-xs md:text-sm">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
