'use client'

import { motion } from 'framer-motion'
import { ThreeJsAnimation } from '@/components/ui/three-js-animation'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

const showcase3dSections = [
  {
    id: 'galaxy',
    title: 'Galaxy Particle System',
    description: 'Immersive particle animations creating a cosmic atmosphere. Perfect for creating depth and visual interest in your interface.',
    cta: 'View Demo'
  },
  {
    id: 'torus',
    title: 'Rotating 3D Geometry',
    description: 'Dynamic wireframe geometries with smooth rotations. Great for showcasing technical projects and interactive experiences.',
    cta: 'Explore'
  },
  {
    id: 'particles',
    title: 'Particle Field',
    description: 'Dense particle clouds with dynamic behavior. Ideal for data visualization and creating engaging visual effects.',
    cta: 'Interact'
  }
]

export function ThreeJsShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="relative w-full py-12 md:py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">
            3D Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Powered by Three.js
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl">
            Interactive 3D visualizations that bring your portfolio and products to life with smooth animations and engaging interactions.
          </p>
        </motion.div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcase3dSections.map((section) => (
            <motion.div key={section.id} variants={itemVariants}>
              <Card className="h-full bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 overflow-hidden group hover:border-slate-700 transition-all duration-300">
                {/* 3D Canvas */}
                <div className="relative w-full h-64 bg-black/40 overflow-hidden border-b border-slate-800">
                  <ThreeJsAnimation
                    scene={section.id as 'galaxy' | 'particles' | 'torus' | 'waves'}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                    {section.description}
                  </p>

                  <button className="w-full px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/40 hover:to-blue-600/40 border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex items-center justify-center gap-2 group">
                    {section.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   )
// }
