import { FaCheck } from "react-icons/fa";

const ClubInfoSection = ({
  images = [
    "https://i.ibb.co/5XcB9MhP/cartoon-people-working-computer-with-blue-background-1068983-28531.avif",
    "https://i.ibb.co/MDx38zqN/follow-me-social-business-theme-design-24877-50426.avif",
    "https://i.ibb.co/tTxqQc8F/community-social-media-people-24877-50802.avif",
    "https://i.ibb.co/Z6tFgwBf/webinar-background-flat-style-23-2147767944.avif",
  ],
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 py-16 px-6 md:px-12 bg-white">
      {/* Left Image Grid */}
      <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
        {images.map((img, index) => (
          <div
            key={index}
            className="h-40 md:h-48 bg-gray-200 rounded overflow-hidden"
          >
            {img && <img src={img} className="w-full h-full object-cover" />}
          </div>
        ))}
      </div>

      {/* Right Text Section */}
      <div className="w-full md:w-1/2 text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-green-700">
          New day with New goals
        </h2>
        <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-700">
          at Sierra del Rio Golf Course
        </h3>

        <ul className="space-y-3 text-gray-700 mb-6">
          <li className="flex items-start gap-2">
            <FaCheck className="text-green-600 mt-1" />
            Course improvements
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="text-green-600 mt-1" />
            Professional level of customer service
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="text-green-600 mt-1" />
            Vibrant new sense of energy at every level!
          </li>
        </ul>

        <p className="text-gray-700 mb-4">
          <span className="font-semibold text-black">*</span> Attention to all
          golfers: The Golf Course is now open while ongoing restorations
          continue to enhance your golfing experience.
        </p>

        <p className="text-gray-700">
          The Club House including the Bar, Restaurant, and Deck open
          <span className="font-semibold text-green-700"> at 11am – 9pm </span>&
          closed on
          <span className="font-semibold"> Tuesdays</span>.
        </p>
      </div>
    </div>
  );
};

export default ClubInfoSection;
