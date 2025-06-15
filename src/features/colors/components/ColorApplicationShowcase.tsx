import { Palette, Zap, Target } from "lucide-react"
import { ColorCategory } from '../types/color.types';

interface ColorApplicationShowcaseProps {
  categories: ColorCategory[]
  isLoading: boolean
  isTransitioning?: boolean
}

interface ColorCardProps {
  title: string
  subtitle: string
  bodyText: string
  Icon: typeof Palette
  bgColor: string
  titleColor: string
  subtitleColor: string
  bodyColor: string
  accentColor: string
}

function ColorCard({
  title,
  subtitle,
  bodyText,
  Icon,
  bgColor,
  titleColor,
  subtitleColor,
  bodyColor,
  accentColor,
}: ColorCardProps) {
  return (
    <div 
      className="w-full shadow-2xl rounded-lg flex flex-col p-6 transition-opacity duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-row items-center justify-between mb-4">
        <h3 className="text-heading-2 font-structural" style={{ color: titleColor }}>
          {title}
        </h3>
        <Icon className="h-6 w-6" style={{ color: accentColor }} />
      </div>
      <div className="flex-grow space-y-2">
        <p className="text-body font-subheader" style={{ color: subtitleColor }}>
          {subtitle}
        </p>
        <p className="text-caption font-content leading-relaxed" style={{ color: bodyColor }}>
          {bodyText}
        </p>
      </div>
    </div>
  )
}

export function ColorApplicationShowcase({ categories, isLoading, isTransitioning }: ColorApplicationShowcaseProps) {
  if (isLoading || !categories || categories.length === 0) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-2 transition-opacity duration-300 ${isLoading || isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-full h-32 bg-zinc-900 rounded-lg" />
        ))}
      </div>
    )
  }

  // Extract colors from categories
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  // Helper to ensure text color is different from background
  const ensureDifferent = (textColor: string, bgColor: string, fallback: string) => {
    return textColor.toLowerCase() === bgColor.toLowerCase() ? fallback : textColor
  }

  const applications = [
    {
      title: "Dashboard",
      subtitle: "Analytics Overview",
      bodyText: "Monitor key metrics and performance indicators with clean data visualization.",
      Icon: Target,
      bgColor: lightColors[0]?.value || "#ffffff",
      titleColor: ensureDifferent(darkColors[0]?.value || "#000000", lightColors[0]?.value || "#ffffff", "#000000"),
      subtitleColor: ensureDifferent(midColors[0]?.value || "#666666", lightColors[0]?.value || "#ffffff", "#666666"),
      bodyColor: ensureDifferent(darkColors[1]?.value || "#333333", lightColors[0]?.value || "#ffffff", "#333333"),
      accentColor: ensureDifferent(midColors[1]?.value || "#0066cc", lightColors[0]?.value || "#ffffff", "#0066cc"),
    },
    {
      title: "Portfolio",
      subtitle: "Creative Showcase",
      bodyText: "Present your work with elegant typography and sophisticated color harmony.",
      Icon: Palette,
      bgColor: midColors[0]?.value || "#f5f5f5",
      titleColor: ensureDifferent(lightColors[0]?.value || "#ffffff", midColors[0]?.value || "#f5f5f5", "#ffffff"),
      subtitleColor: ensureDifferent(lightColors[1]?.value || "#cccccc", midColors[0]?.value || "#f5f5f5", "#cccccc"),
      bodyColor: ensureDifferent(lightColors[2]?.value || "#aaaaaa", midColors[0]?.value || "#f5f5f5", "#aaaaaa"),
      accentColor: ensureDifferent(darkColors[0]?.value || "#333333", midColors[0]?.value || "#f5f5f5", "#333333"),
    },
    {
      title: "Landing",
      subtitle: "Product Launch",
      bodyText: "Capture attention with bold contrasts and strategic color placement.",
      Icon: Zap,
      bgColor: darkColors[0]?.value || "#000000",
      titleColor: ensureDifferent(lightColors[0]?.value || "#ffffff", darkColors[0]?.value || "#000000", "#ffffff"),
      subtitleColor: ensureDifferent(midColors[1]?.value || "#999999", darkColors[0]?.value || "#000000", "#999999"),
      bodyColor: ensureDifferent(lightColors[1]?.value || "#cccccc", darkColors[0]?.value || "#000000", "#cccccc"),
      accentColor: ensureDifferent(lightColors[2]?.value || "#ffaa00", darkColors[0]?.value || "#000000", "#ffaa00"),
    },
  ]

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-2 transition-opacity duration-300 ${isLoading || isTransitioning ? "opacity-0" : "opacity-100"}`}>
      {applications.map((app, index) => (
        <ColorCard key={index} {...app} />
      ))}
    </div>
  )
}
