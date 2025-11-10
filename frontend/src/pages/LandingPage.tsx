import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/events")
    }
  }, [isAuthenticated])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 space-y-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold drop-shadow-lg leading-tight"
        >
          Welcome to <span className="text-indigo-600">EventHub</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed text-gray-600"
        >
          Discover, create, and join exciting events in your community. Make every moment unforgettable!
        </motion.p>

        {/* Feature Section */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {[
            {
              icon: "📅",
              title: "Create Events",
              desc: "Plan and organize your events effortlessly with our intuitive tools."
            },
            {
              icon: "🔍",
              title: "Discover",
              desc: "Explore trending events near you and find what interests you most."
            },
            {
              icon: "👥",
              title: "Connect",
              desc: "Meet like-minded people and grow your network through events."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-10 rounded-2xl border border-gray-200 hover:border-indigo-400 transition shadow-md hover:shadow-lg space-y-3"
            >
              {/* 👇 Bounce Animation Added Here */}
              <motion.div
                className="text-5xl mb-3"
                animate={{ y: [0, -25, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-2xl font-semibold text-indigo-700">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-200 mt-10 bg-white">
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </footer>
    </div>
  )
}

export default LandingPage
