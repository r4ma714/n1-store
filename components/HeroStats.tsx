export default function HeroStats() {
  const stats = [
    {
      value: "50K+",
      label: "Active Users",
    },
    {
      value: "99.9%",
      label: "Uptime",
    },
    {
      value: "24/7",
      label: "Support",
    },
  ];

  return (
    <div className="mt-14 flex gap-12">
      {stats.map((item) => (
        <div key={item.label}>
          <h3 className="text-3xl font-bold text-white">
            {item.value}
          </h3>

          <p className="mt-2 text-gray-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}