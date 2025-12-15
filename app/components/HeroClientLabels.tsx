'use client'

import { useEffect, useState, useRef } from 'react'

interface LabelNode {
  label: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

interface HeroLabelsProp {
  labels: string[]
}
type ScreenCategory = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

function useScreenCategory(): ScreenCategory {
  const [category, setCategory] = useState<ScreenCategory>('sm')

  useEffect(() => {
    const updateCategory = () => {
      const width = window.innerWidth
      if (width < 384) return setCategory('xs') 
      else if (width < 768) return setCategory('sm') 
      else if (width < 1024) return setCategory('md') 
      else if (width < 1280) return setCategory('lg') 
      else if (width < 1536) return setCategory('xl') 
      else setCategory('2xl') 
    
    }

    updateCategory()
    window.addEventListener('resize', updateCategory)
    return () => window.removeEventListener('resize', updateCategory)
  }, [])

  return category
}

function calculateIoU(a: LabelNode, b: LabelNode): number {
  const ax1 = a.x - a.width / 2
  const ay1 = a.y - a.height / 2
  const ax2 = a.x + a.width / 2
  const ay2 = a.y + a.height / 2

  const bx1 = b.x - b.width / 2
  const by1 = b.y - b.height / 2
  const bx2 = b.x + b.width / 2
  const by2 = b.y + b.height / 2

  const x1 = Math.max(ax1, bx1)
  const y1 = Math.max(ay1, by1)
  const x2 = Math.min(ax2, bx2)
  const y2 = Math.min(ay2, by2)

  const intersectionArea = Math.max(0, x2 - x1) * Math.max(0, y2 - y1)
  const areaA = a.width * a.height
  const areaB = b.width * b.height
  const unionArea = areaA + areaB - intersectionArea

  return unionArea > 0 ? intersectionArea / unionArea : 0
}

function generateNonOverlappingNodes(
  labels: string[],
  containerWidth: number,
  containerHeight: number,
  maxAttempts = 100
): LabelNode[] {
  const nodes: LabelNode[] = []
  const colors = ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6']

  for (let label of labels) {
    const width = label.length * 8 + 20
    const height = 28

    let attempts = 0
    while (attempts < maxAttempts) {
      const x = Math.random() * (containerWidth - width) + width / 2
      const y = Math.random() * (containerHeight - height) + height / 2

      const newNode: LabelNode = {
        label,
        x,
        y,
        width,
        height,
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      const overlaps = nodes.some((node) => calculateIoU(newNode, node) > 0)

      if (!overlaps) {
        nodes.push(newNode)
        break
      }

      attempts++
    }
  }
  return nodes
}

export default function HeroClientLabels({ labels }: HeroLabelsProp) {
  const [nodes, setNodes] = useState<LabelNode[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const screen = useScreenCategory()

  const threshold =
    screen === 'xs' ? 120 :
    screen === 'sm' ? 140 :
    screen === 'md' ? 180 :
    screen === 'lg' ? 190 :
    screen === 'xl' ? 200 :
    250

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      const nodes = generateNonOverlappingNodes(labels, width, height)
      setNodes(nodes)
    }
  }, [labels, screen])

  return (
    <div className="relative w-full max-w-[1200px] mx-auto h-[380px] sm:h-[350px] lg:h-[240px] 2xl:h-[400px]" ref={containerRef}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute inset-0 z-0 pointer-events-none w-full h-full">
          {nodes.map((a, i) =>
            nodes.slice(i + 1).map((b, j) => {
              const dx = a.x - b.x
              const dy = a.y - b.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < threshold) {
                return (
                  <line
                    key={`line-${i}-${j}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="#93c5fd"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                )
              }
              return null
            })
          )}
        </svg>

        {nodes.map((node, index) => (
          <span
            key={index}
            className="absolute text-xs px-2 py-1 rounded-full animate-float"
            style={{
              left: node.x - node.width / 2,
              top: node.y - node.height / 2,
              width: node.width,
              backgroundColor: node.color,
              color: '#1e3a8a',
            }}
          >
            {node.label}
          </span>
        ))}
      </div>
    </div>
  )
}
