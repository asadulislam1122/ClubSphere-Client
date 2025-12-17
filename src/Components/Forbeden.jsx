import { Link } from "react-router";
import { FaHome, FaThLarge, FaExclamationTriangle } from "react-icons/fa";

const Forbidden = () => {
  // বানান ঠিক করা হয়েছে: Forbeden -> Forbidden
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800 p-6">
      {/* বড় আইকন বা এনিমেশন সেকশন */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-200 blur-3xl rounded-full opacity-50 animate-pulse"></div>
        <FaExclamationTriangle className="text-9xl text-red-500 relative z-10 animate-bounce" />
      </div>

      {/* টেক্সট সেকশন */}
      <h1 className="text-6xl font-black text-slate-900 mb-2">403</h1>
      <h2 className="text-2xl font-bold mb-4 text-slate-700">
        Access Denied / Forbidden
      </h2>

      <p className="mt-2 text-center max-w-md text-slate-500 mb-10">
        Oops! It looks like you've reached a restricted area. You don't have the
        necessary permissions to view this content.
      </p>

      {/* বাটন সেকশন - ক্লিন এবং মডার্ন */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full font-medium transition-all hover:bg-slate-700 hover:shadow-xl active:scale-95"
        >
          <FaHome /> Go to Home
        </Link>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-full font-medium transition-all hover:bg-slate-50 hover:shadow-lg active:scale-95"
        >
          <FaThLarge /> Dashboard
        </Link>
      </div>

      {/* স্লাইড ফুটার */}
      <div className="mt-16 text-sm text-slate-400">
        If you think this is a mistake, please contact support.
      </div>
    </div>
  );
};

export default Forbidden;
