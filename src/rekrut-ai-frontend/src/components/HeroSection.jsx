import StatsCard from "./Fragments/StatsCard";

export default function HeroSection() {
  return (
    <>
      {/* left section */}
      <div className="flex flex-col gap-5">
        <div className="bg-figma-secondary-light w-fit p-2 rounded-full">
          <span className="text-figma-secondary">
            Your Interview Comspananion
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-bold my-5">RekrutAI</h1>
          <p className="font-medium">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
            ipsam nulla, voluptatem qui necessitatibus eveniet quia cupiditate
            dolorum porro veniam dolores debitis distinctio? Maiores officiis
            perferendis deserunt veniam, laborum culpa.
          </p>
        </div>
        <div className="flex justify-evenly flex-wrap gap-5">
          <StatsCard
            color="text-figma-primary"
            bgcolor="border-figma-primary-light"
          />
          <StatsCard
            color="text-figma-secondary"
            bgcolor="bg-figma-secondary-light"
            border="border-figma-secondary-lightActive"
          />
          <StatsCard
            color="text-figma-primary"
            bgcolor="bg-figma-primary-light"
            border="border-figma-primary-lightActive"
          />
        </div>
      </div>

      {/* right section */}
      <div className="kanan"></div>
    </>
  );
}
