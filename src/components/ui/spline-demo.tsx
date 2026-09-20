'use client'

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] md:h-[600px] bg-gradient-to-b from-slate-950 via-slate-900 to-black/[0.96] relative overflow-hidden border-slate-800">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        size={300}
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col justify-center max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
              Interactive 3D
            </h1>
            <p className="mt-4 text-slate-300 text-sm md:text-base max-w-lg leading-relaxed">
              Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
              that capture attention and enhance your design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 flex gap-3"
          >
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Explore 3D
            </button>
            <button className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-900/50 transition-all">
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Right content - 3D Scene */}
        <div className="hidden md:flex flex-1 relative items-center justify-center">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
