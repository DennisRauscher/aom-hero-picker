import React from 'react'
import { motion } from 'framer-motion'
import { Sword, Coins, Shield, Zap, Map, Wand2, Anchor, Eye, Clock } from 'lucide-react'

interface SkillProps {
  name: string
  value: number
  icon: React.ReactNode
}

const Skill: React.FC<SkillProps> = ({ name, value, icon }) => (
  <div className="flex items-center mb-2">
    <div className="w-8 h-8 mr-2 flex items-center justify-center">{icon}</div>
    <div className="flex-grow">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-yellow-300">{name}</span>
        <span className="text-sm font-medium text-yellow-300">{value}/5</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="bg-yellow-400 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  </div>
)

interface GodSkillsProps {
  metrics: {
    militaryStrength: number
    economicGrowth: number
    defensiveCapabilities: number
    aggressionEarlyGamePower: number
    mobilityMapControl: number
    godPowerEffectiveness: number
    mythUnitStrength: number
    navalPower: number
    scoutingVision: number
    lateGamePotential: number
  }
}

export const GodSkills: React.FC<GodSkillsProps> = ({ metrics }) => {
  const skills = [
    { name: "Military Strength", value: metrics.militaryStrength, icon: <Sword className="w-6 h-6 text-yellow-400" /> },
    { name: "Economic Growth", value: metrics.economicGrowth, icon: <Coins className="w-6 h-6 text-yellow-400" /> },
    { name: "Defensive Capabilities", value: metrics.defensiveCapabilities, icon: <Shield className="w-6 h-6 text-yellow-400" /> },
    { name: "Early Game Power", value: metrics.aggressionEarlyGamePower, icon: <Zap className="w-6 h-6 text-yellow-400" /> },
    { name: "Map Control", value: metrics.mobilityMapControl, icon: <Map className="w-6 h-6 text-yellow-400" /> },
    { name: "God Power Effectiveness", value: metrics.godPowerEffectiveness, icon: <Wand2 className="w-6 h-6 text-yellow-400" /> },
    { name: "Myth Unit Strength", value: metrics.mythUnitStrength, icon: <Eye className="w-6 h-6 text-yellow-400" /> },
    { name: "Naval Power", value: metrics.navalPower, icon: <Anchor className="w-6 h-6 text-yellow-400" /> },
    { name: "Scouting Vision", value: metrics.scoutingVision, icon: <Eye className="w-6 h-6 text-yellow-400" /> },
    { name: "Late Game Potential", value: metrics.lateGamePotential, icon: <Clock className="w-6 h-6 text-yellow-400" /> },
  ]

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-4 mt-4">
      <h3 className="text-xl font-semibold mb-4 text-yellow-300">God Skills</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <Skill key={skill.name} name={skill.name} value={skill.value} icon={skill.icon} />
        ))}
      </div>
    </div>
  )
}