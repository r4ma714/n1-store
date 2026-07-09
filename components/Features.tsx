const features = [
  {
    title: "Lightning Fast",
    desc: "Instant IPA signing with ultra-fast delivery.",
    icon: "⚡",
  },
  {
    title: "Premium Certificates",
    desc: "Reliable certificates with maximum stability.",
    icon: "🔒",
  },
  {
    title: "Cloud Install",
    desc: "Install apps directly without a computer.",
    icon: "☁️",
  },
  {
    title: "iOS 18 Ready",
    desc: "Supports the latest iOS versions.",
    icon: "📱",
  },
  {
    title: "Dashboard",
    desc: "Manage your devices and certificates easily.",
    icon: "💎",
  },
  {
    title: "24/7 Support",
    desc: "Friendly support whenever you need help.",
    icon: "🛡️",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-32">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white">
          Powerful Features
        </h2>

        <p className="mt-4 text-gray-400">
          Everything you need for a premium iPhone signing experience.
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-purple-500/10"
          >
            <div className="text-5xl">{item.icon}</div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              {item.title}
            </h3>

            <p className="mt-3 text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}