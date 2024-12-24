import React, { useEffect, useState } from "react";

function Card() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=1&seed=abc")
      .then((resp) => resp.json())
      .then((result) => {
        setData(result.results);
        setTimeout(() => setIsLoaded(true), 100);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600 animate-pulse">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {data.map((user, index) => (
        <div
          key={index}
          className={`relative border-2 border-black w-[80%] max-w-6xl p-8 bg-white 
            transform transition-all duration-700 ease-out
            hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            before:content-[''] before:absolute before:inset-0 
            before:bg-gradient-to-r before:from-transparent before:to-transparent
            before:opacity-0 before:transition-opacity before:duration-300
            hover:before:opacity-10 hover:before:from-blue-500 hover:before:to-green-500
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative corner effects */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-500 opacity-0 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-500 opacity-0 transition-all duration-300 translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"></div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Section */}
            <div className="w-full md:w-1/3 perspective-1000">
              <div className="relative border-2 border-black aspect-square overflow-hidden group transition-transform duration-500 hover:rotate-2 hover:scale-105">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                />
                
                {/* Image hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
              {/* Name row with hover effects */}
              <div className="flex gap-4 justify-between">
                <div className="group cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
                  <h2 className="text-[40px] leading-none transition-all duration-300 group-hover:text-blue-600">
                    First Name: {user.name.first}
                    <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-blue-600"></span>
                  </h2>
                  {/* Particle effect on hover */}
                  <div className="absolute -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute -top-2 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  </div>
                </div>
                
                <div className="group cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
                  <h2 className="text-[40px] leading-none transition-all duration-300 group-hover:text-blue-600">
                    Last Name: {user.name.last}
                    <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-blue-600"></span>
                  </h2>
                </div>
              </div>

              {/* Animated gender section */}
              <div className="py-12 group">
                <p className="text-[40px] py-16 leading-none transition-all duration-500 
                   hover:text-green-600 hover:translate-x-2 cursor-pointer
                   animate-float select-none relative">
                  Gender: {user.gender}
                  {/* Animated background effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100 to-transparent opacity-0 group-hover:opacity-30 -z-10 group-hover:animate-shine"></span>
                </p>
              </div>

              {/* Phone number with enhanced effects */}
              <div className="group cursor-pointer relative overflow-hidden">
                <p className="text-[40px] leading-none transition-all duration-300 
                   group-hover:text-blue-600 relative z-10 transform group-hover:translate-x-2">
                  Phone Number: {user.phone}
                </p>
                {/* Sliding glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 
                     translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-blue-600"></div>
                {/* Pulsing dot indicator */}
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Add keyframes for custom animations
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes shine {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }
`;
document.head.appendChild(style);

export default Card;