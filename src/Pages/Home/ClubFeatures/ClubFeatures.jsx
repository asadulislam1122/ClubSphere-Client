import { FaCalendarAlt, FaEnvelope, FaGolfBall, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const ClubFeatures = () => {
  const features = [
    {
      icon: <FaCalendarAlt className="text-green-600 text-3xl" />,
      title: "Schedule an Event",
      description: "We'll make it memorable.",
    },
    {
      icon: <FaEnvelope className="text-green-600 text-3xl" />,
      title: "Stay in Touch",
      description: "Receive special announcements & offers.",
    },
    {
      icon: <FaGolfBall className="text-green-600 text-3xl" />,
      title: "Schedule a Tournament",
      description: "We host amazing golf tournaments.",
    },
    {
      icon: <FaClock className="text-green-600 text-3xl" />,
      title: "Book a Tee Time",
      description: "It only takes a minute.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-white">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ClubFeatures;
