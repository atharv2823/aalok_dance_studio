"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { TypeAnimation } from "react-type-animation";
import RollingGallery from "./_components/RollingGallery";
import { ArrowBigRightDash } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    src: "https://i.pinimg.com/736x/7f/73/a5/7f73a5fe20e285ea4e51f1f20b9d4ed7.jpg",
    title: "Feel the Rhythm, Move Your Feet!",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/736x/65/61/25/6561251799cd3d16395c09970a84a54b.jpg",
    title: "Learn from the Best",
  },
  {
    id: 3,
    src: "https://wallpapercave.com/wp/wp10469086.jpg",
    title: "Dance Your Way to Fitness",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add this function inside the Home component
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [statsKey, setStatsKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatsKey((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gray-200/20 via-gray-200/10 to-gray-200/20 backdrop-blur-sm z-[9999]">
        <motion.div
          className="relative h-full w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
          style={{
            transformOrigin: "left",
            scaleX: scrollProgress / 100,
          }}
          initial={{ scaleX: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          animate={{
            boxShadow: "0 2px 12px rgba(147, 51, 234, 0.3)",
          }}
        >
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full text-purple-600"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowBigRightDash size={20} />
          </motion.div>
          <motion.div
            className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-400"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 10px rgba(147, 51, 234, 0.3)",
                "0 0 20px rgba(147, 51, 234, 0.5)",
                "0 0 10px rgba(147, 51, 234, 0.3)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white/30 blur-[1px]" />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Hero Section with Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50">
              <div className="container mx-auto h-full flex flex-col items-center justify-center">
                <TypeAnimation
                  sequence={["Aalok Dance Studio & Karma Yoga Classes"]}
                  wrapper="h1"
                  speed={50}
                  className="text-2xl sm:text-4xl md:text-6xl text-white font-extrabold text-center mb-4 sm:mb-6 tracking-wide drop-shadow-lg font-serif px-4"
                  cursor={false}
                />
                <h2 className="text-xl sm:text-2xl md:text-4xl text-white font-semibold max-w-2xl text-center italic tracking-wide drop-shadow-md px-4">
                  {slide.title}
                </h2>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated Marquee */}
      <div className="bg-purple-800 py-4 overflow-hidden">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="whitespace-nowrap"
        >
          <span className="text-2xl font-bold text-white inline-block mx-4">
            ⭐ Join Now and Get 20% Off on Your First Month! ⭐
          </span>
          <span className="text-2xl font-bold text-white inline-block mx-4">
            🎵 Learn from Expert Instructors 🎵
          </span>
          <span className="text-2xl font-bold text-white inline-block mx-4">
            💃 New Batch Starting Soon! 💃
          </span>
        </motion.div>
      </div>

      {/* Dance Studio Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="./dance-room.jpg"
                width={500}
                height={400}
                alt="Dance Studio"
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-purple-800 dark:text-purple-400 relative">
                Our Dancing Style
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-purple-600 mt-2"></span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Experience the perfect blend of traditional and contemporary
                dance forms. Our expert instructors bring years of experience
                and passion to every class.
              </p>
              <ul className="grid grid-cols-2 gap-6">
                {[
                  "Classical Dance",
                  "Hip Hop",
                  "Contemporary",
                  "Bollywood",
                ].map((style, index) => (
                  <motion.li
                    key={style}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    <span className="text-purple-600 text-xl">✓</span>
                    <span className="font-semibold">{style}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-purple-800 dark:text-purple-400 mb-4">
              Our Classes
            </h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover your passion for dance through our diverse range of
              classes taught by expert instructors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Classical",
                description:
                  "Master the graceful movements and rich traditions of classical dance forms",
                price: "₹2000/month",
                schedule: "Mon, Wed, Fri",
              },
              {
                name: "Hip Hop",
                description:
                  "Learn urban dance styles with high-energy choreography and beats",
                price: "₹2500/month",
                schedule: "Tue, Thu, Sat",
              },
              {
                name: "Contemporary",
                description:
                  "Express yourself through fluid movements and modern techniques",
                price: "₹2200/month",
                schedule: "Wed, Fri, Sun",
              },
              {
                name: "Bollywood",
                description:
                  "Experience the vibrant fusion of Indian classical and modern dance",
                price: "₹2300/month",
                schedule: "Mon, Thu, Sat",
              },
              {
                name: "Folk Dance",
                description:
                  "Celebrate cultural heritage through traditional folk dance forms",
                price: "₹1800/month",
                schedule: "Tue, Fri, Sun",
              },
              {
                name: "Western",
                description:
                  "Master various western dance styles and techniques",
                price: "₹2400/month",
                schedule: "Mon, Wed, Sat",
              },
            ].map((dance, index) => (
              <motion.div
                key={dance.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden group"
              >
                <div className="relative">
                  <Image
                    src={`/dance-${dance.name.toLowerCase()}.jpg`}
                    width={400}
                    height={300}
                    alt={dance.name}
                    className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    {dance.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-purple-700 dark:text-purple-300">
                    {dance.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {dance.description}
                  </p>
                  <div className="flex items-center mb-4 text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {dance.schedule}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 group"
                  >
                    <span>Join Now</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yoga Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-purple-800 dark:text-purple-400 mb-4">
              Karma Yoga Classes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your mind, body, and soul through our authentic yoga
              practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Hatha Yoga",
                description:
                  "Traditional yoga postures with breathing techniques",
                icon: "🧘‍♀️",
              },
              {
                title: "Meditation",
                description: "Guided sessions for mental peace and clarity",
                icon: "🕉️",
              },
              {
                title: "Power Yoga",
                description: "Dynamic and energetic yoga practice",
                icon: "💪",
              },
              {
                title: "Pranayama",
                description: "Ancient breathing techniques for vitality",
                icon: "🌬️",
              },
              {
                title: "Ashtanga Yoga",
                description: "Systematic series of postures",
                icon: "⭐",
              },
              {
                title: "Yoga Therapy",
                description: "Healing through yogic practices",
                icon: "🌿",
              },
            ].map((yoga, index) => (
              <motion.div
                key={yoga.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-4xl mb-4">{yoga.icon}</div>
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-3">
                  {yoga.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {yoga.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-400 mb-6">
              Join Our Yoga Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Experience the perfect harmony of mind, body, and spirit through
              our comprehensive yoga programs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors text-lg font-semibold"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-purple-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            key={Math.random()} // Forces re-render
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { end: 1000, label: "Happy Students" },
              { end: 10, label: "Dance Forms" },
              { end: 100, label: "Compitions Winning" },
              { end: 15, label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <h3 className="text-4xl font-bold mb-2">
                  <CountUp
                    end={stat.end}
                    duration={2.5}
                    suffix="+"
                    key={Date.now()} // Forces CountUp to restart
                  />
                </h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 dark:text-purple-400 mb-4">
              Our Instructors
            </h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from our students who have transformed their passion for
              dance into success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Priya Sharma",
                form: "Classical Dance",
                image: "/student-1.jpg",
                testimonial:
                  "Started as a beginner, now performing on national stages. The instructors here helped me discover my true potential.",
                achievement: "Won National Dance Competition 2023",
              },
              {
                name: "Rahul Verma",
                form: "Hip Hop",
                image: "/student-2.jpg",
                testimonial:
                  "The energy and passion of the teachers is contagious. They don't just teach dance, they inspire you to be better.",
                achievement: "Featured in Dance India Dance",
              },
              {
                name: "Ananya Patel",
                form: "Bharatanatyam",
                image: "/student-3.jpg",
                testimonial:
                  "The perfect blend of traditional values and modern teaching methods. Every class is a new learning experience.",
                achievement: "Performed at International Dance Festival",
              },
            ].map((student, index) => (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <Image
                      src={student.image}
                      width={80}
                      height={80}
                      alt={student.name}
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-1 rounded-full">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-purple-800 dark:text-purple-300">
                      {student.name}
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                      {student.form}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{student.testimonial}"
                </blockquote>
                <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {student.achievement}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-2 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 dark:text-purple-400 mb-4">
          Our Mempries
        </h2>
        <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We Have A Grate Dance Students
        </p>
      </motion.div>
      <RollingGallery height="600px" autoplay={true} pauseOnHover={true} />

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-purple-800 dark:text-purple-400">
                Get in Touch
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg border"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg border"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 rounded-lg border"
                ></textarea>
                <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
            <div className="md:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8  text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Image
                src="/rocket.png"
                width={50}
                height={50}
                alt="Scroll to top"
                className=""
              />
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-1 h-2 bg-white rounded-full" />
              </motion.div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
