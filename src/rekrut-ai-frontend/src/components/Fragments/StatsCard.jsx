export default function StatsCard({ bgcolor, color, border }) {
  return (
    <>
      <div
        className={`border-2 ${bgcolor} ${color} ${border} w-40 h-32 p-3 rounded-lg text-center flex flex-col items-center justify-center`}
      >
        <h1 className="text-2xl font-bold">90%</h1>
        <p className="text-xs font-medium">
          Merasa terbantu dengan latihan terlebih dahulu bersama RekrutAI
        </p>
      </div>
    </>
  );
}
