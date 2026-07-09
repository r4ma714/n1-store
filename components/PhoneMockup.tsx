export default function PhoneMockup() {
  return (
    <div className="relative">

      <div className="absolute -inset-8 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative h-[620px] w-[320px] rounded-[45px] border border-purple-500/20 bg-neutral-950 shadow-[0_0_80px_rgba(168,85,247,.35)] overflow-hidden">

        <div className="mx-auto mt-4 h-7 w-36 rounded-full bg-black" />

        <div className="flex h-full flex-col items-center justify-center px-8">

          <h2 className="text-4xl font-bold text-white">
            N<span className="text-purple-500">1</span>
          </h2>

          <p className="mt-2 text-center text-gray-400">
            Premium iPhone Signing Platform
          </p>

          <button className="mt-10 w-full rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-500">
            Install IPA
          </button>

          <button className="mt-4 w-full rounded-xl border border-white/10 py-3 text-white transition hover:bg-white/10">
            Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}