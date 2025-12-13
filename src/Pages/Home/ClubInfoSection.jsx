import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

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
      <motion.div
        className="grid grid-cols-2 gap-4 w-full md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="h-40 md:h-48 bg-gray-200 rounded overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            {img && <img src={img} className="w-full h-full object-cover" />}
          </motion.div>
        ))}
      </motion.div>

      {/* Right Text Section */}
      <motion.div
        className="w-full md:w-1/2 text-gray-800"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-2 text-green-700"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          New day with New goals
        </motion.h2>

        <motion.h3
          className="text-lg md:text-xl font-semibold mb-6 text-gray-700"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          at Sierra del Rio Golf Course
        </motion.h3>

        <ul className="space-y-3 text-gray-700 mb-6">
          {[
            "Course improvements",
            "Professional level of customer service",
            "Vibrant new sense of energy at every level!",
          ].map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <FaCheck className="text-green-600 mt-1" />
              {item}
            </motion.li>
          ))}
        </ul>

        <motion.p
          className="text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-semibold text-black">*</span> Attention to all
          golfers: The Golf Course is now open while ongoing restorations
          continue to enhance your golfing experience.
        </motion.p>

        <motion.p
          className="text-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Club House including the Bar, Restaurant, and Deck open
          <span className="font-semibold text-green-700"> at 11am – 9pm </span>&
          closed on
          <span className="font-semibold"> Tuesdays</span>.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ClubInfoSection;
