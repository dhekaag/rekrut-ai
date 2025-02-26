export default function StatsCard({ bgcolor, color, border }) {
  return (
    <div
      className={`border ${border} ${bgcolor} ${color} w-40 h-32 p-3 rounded-lg text-center flex flex-col items-center justify-center transition-all hover:shadow-md`}
    >
      <h1 className="text-2xl font-bold">90%</h1>
      <p className="text-xs font-medium mt-1">
        Merasa terbantu dengan latihan terlebih dahulu bersama RekrutAI
      </p>
    </div>
  );
}
