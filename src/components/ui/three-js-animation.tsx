'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeJsAnimationProps {
  className?: string
  scene?: 'galaxy' | 'particles' | 'waves' | 'torus'
}

export function ThreeJsAnimation({ className = '', scene = 'galaxy' }: ThreeJsAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const width = container.clientWidth
    const height = container.clientHeight
    
    const scene_3d = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    camera.position.z = 3

    let objects: THREE.Object3D[] = []
    let geometries: THREE.BufferGeometry[] = []
    let materials: THREE.Material[] = []

    // Scene configurations
    if (scene === 'galaxy') {
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCnt = 1000
      const posArray = new Float32Array(particlesCnt * 3)

      for (let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00d4ff,
        sizeAttenuation: true,
      })

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene_3d.add(particlesMesh)
      objects = [particlesMesh]
      geometries = [particlesGeometry]
      materials = [particlesMaterial]
    } 
    else if (scene === 'torus') {
      const geometry = new THREE.TorusGeometry(1, 0.4, 100, 100)
      const material = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x0066ff,
        wireframe: true,
      })
      const torus = new THREE.Mesh(geometry, material)
      
      const geometry2 = new THREE.TorusGeometry(1.5, 0.2, 100, 100)
      const material2 = new THREE.MeshPhongMaterial({
        color: 0xff0080,
        emissive: 0xff0066,
        wireframe: true,
      })
      const torus2 = new THREE.Mesh(geometry2, material2)
      
      scene_3d.add(torus)
      scene_3d.add(torus2)
      objects = [torus, torus2]
      geometries = [geometry, geometry2]
      materials = [material, material2]
    }
    else if (scene === 'particles') {
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCnt = 5000
      const posArray = new Float32Array(particlesCnt * 3)

      for (let i = 0; i < particlesCnt * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 10
        posArray[i + 1] = (Math.random() - 0.5) * 10
        posArray[i + 2] = (Math.random() - 0.5) * 10
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x00d4ff,
        sizeAttenuation: true,
      })

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene_3d.add(particlesMesh)
      objects = [particlesMesh]
      geometries = [particlesGeometry]
      materials = [particlesMaterial]
    }
    else if (scene === 'waves') {
      const geometry = new THREE.PlaneGeometry(5, 5, 100, 100)
      const material = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x0066ff,
        wireframe: true,
        side: THREE.DoubleSide,
      })
      const plane = new THREE.Mesh(geometry, material)
      scene_3d.add(plane)
      objects = [plane]
      geometries = [geometry]
      materials = [material]
    }

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(5, 5, 5)
    scene_3d.add(light)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene_3d.add(ambientLight)

    // Animation loop
    let animationFrame = 0
    const animate = () => {
      animationFrame = requestAnimationFrame(animate)

      objects.forEach((obj, index) => {
        if (scene === 'galaxy') {
          obj.rotation.x += 0.0005
          obj.rotation.y += 0.0005
        } else if (scene === 'torus') {
          obj.rotation.x += 0.005
          obj.rotation.y += 0.005 * (index + 1)
          obj.rotation.z += 0.001
        } else if (scene === 'particles') {
          obj.rotation.x += 0.001
          obj.rotation.y += 0.001
        } else if (scene === 'waves') {
          const geometry = (obj as THREE.Mesh).geometry
          const positions = geometry.getAttribute('position')
          const positionAttribute = positions as THREE.BufferAttribute
          const array = positionAttribute.array as Float32Array
          
          for (let i = 0; i < array.length; i += 3) {
            const x = (i / 3) % 101
            const y = Math.floor((i / 3) / 101)
            array[i + 2] = Math.sin(x * 0.1 + performance.now() * 0.001) * 
                          Math.cos(y * 0.1 + performance.now() * 0.001) * 0.5
          }
          positionAttribute.needsUpdate = true
        }
      })

      renderer.render(scene_3d, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrame)
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
      geometries.forEach(geo => geo.dispose())
      materials.forEach(mat => mat.dispose())
      renderer.dispose()
    }
  }, [scene])

  return <div ref={containerRef} className={`w-full h-full ${className}`} />
}
