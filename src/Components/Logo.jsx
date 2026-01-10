import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group transition-all duration-300"
    >
      {/* Animated Icon Container */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full group-hover:bg-green-400/40 transition-all duration-500"></div>
        <img
          className="w-10 relative z-10 group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700 ease-in-out"
          src="https://img.icons8.com/pulsar-gradient/48/disco-ball.png"
          alt="ClubSphere Logo"
        />
      </div>

      {/* Modern Unique Typography */}
      <div className="flex flex-col -space-y-1">
        <h2 className="font-black text-2xl tracking-tighter bg-gradient-to-br from-green-500 via-emerald-400 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x group-hover:bg-right transition-all duration-500">
          Club<span className="italic">Sphere</span>
        </h2>
        <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-green-500 to-transparent transition-all duration-500"></div>
      </div>
    </Link>
  );
};

export default Logo;
