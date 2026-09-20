'use client'

import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { ThreeJsAnimation } from '@/components/ui/three-js-animation'
import { ArrowRight } from 'lucide-react'

interface EnhancedHeroProps {
  title: string
  subtitle: string
  description: string
  ctaText?: string
  ctaHref?: string
  scene3d?: '3d' | 'spline'
}

export function EnhancedHero({
  title,
  subtitle,
  description,
  ctaText = 'Explore',
  ctaHref = '#projects',
  scene3d = 'spline'
}: EnhancedHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      <Card className="w-full min-h-[500px] md:min-h-[600px] bg-gradient-to-br from-slate-950 via-slate-900 to-black border-slate-800 relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          size={300}
        />

        <div className="flex flex-col md:flex-row h-full">
          {/* Left Content */}
          <motion.div
            className="flex-1 p-6 md:p-8 lg:p-12 relative z-10 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30">
                ✨ New Features
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400 mb-4 leading-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-300 mb-6 max-w-xl leading-relaxed"
            >
              {subtitle}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed mb-8"
            >
              {description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href={ctaHref}
                className="group relative px-6 py-3 rounded-lg font-semibold text-white overflow-hidden inline-flex items-center justify-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-r from-cyan-500/50 to-blue-600/50 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  {ctaText}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <button className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-900/50 hover:border-slate-500 transition-all">
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-700/50"
            >
              <div>
                <div className="text-2xl md:text-3xl font-bold text-cyan-400">10+</div>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Projects Built</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400">500+</div>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Stars on GitHub</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-purple-400">50+</div>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Contributions</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Scene */}
          <motion.div
            className="hidden md:flex flex-1 relative items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {scene3d === 'spline' ? (
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            ) : (
              <ThreeJsAnimation
                scene="torus"
                className="w-full h-full rounded-lg"
              />
            )}
          </motion.div>
        </div>
      </Card>
    </section>
  )
}
