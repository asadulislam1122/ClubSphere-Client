import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://img.icons8.com/pulsar-gradient/48/disco-ball.png"
        alt="Photography Club Logo"
      />
      <h2 className="font-bold md:text-2xl text-green-600">ClubSphere</h2>
    </div>
  );
};

export default Logo;
