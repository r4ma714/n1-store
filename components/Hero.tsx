import PhoneMockup from "./PhoneMockup";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8 pt-28">
      <div className="max-w-xl">
        <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
          🚀 Trusted iPhone Signing Platform
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white">
          Sign iOS Apps
          <br />
          <span className="text-purple-500">
            Without Limits
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400">
          Install IPA files safely with premium certificates,
          lightning-fast delivery and premium dashboard.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-purple-600 px-8 py-4 font-semibold text-white transition hover:bg-purple-500">
            Get Started
          </button>

          <button className="rounded-xl border border-white/20 px-8 py-4 text-white transition hover:bg-white/10">
            Learn More
          </button>
        </div>

        <HeroStats />
      </div>

      <div className="hidden lg:block">
        <PhoneMockup />
      </div>
    </section>
  );
}