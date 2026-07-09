export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold text-white">
          N<span className="text-purple-500">1</span>
        </h1>

        <div className="hidden gap-8 text-gray-300 md:flex">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Packages</a>
          <a href="#" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>

        <button className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-500">
          Get Started
        </button>
      </div>
    </nav>
  );
}