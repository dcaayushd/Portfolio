'use client'

import { SplineScene } from '@/components/ui/splite'

export function SplineHeroOnly() {
  return (
    <section className="relative w-full h-full overflow-hidden">
      <div className="mx-auto w-full h-full">
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-transparent">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full hero-robot-spline"
          />
        </div>
      </div>
    </section>
  )
}
