import React from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

interface LegalInfoProps {
  type: 'impressum' | 'privacy' | 'terms'
  onClose: () => void
}

export function LegalInfo({ type, onClose }: LegalInfoProps) {
  const title = type === 'impressum' ? 'Impressum' : type === 'privacy' ? 'Privacy Policy' : 'Terms of Use'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl text-black">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b">
          <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {type === 'impressum' && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Information according to § 5 TMG</h4>
              <p>Dennis Rauscher</p>
              <p>Feldstr. 6</p>
              <p>51702 Bergneustadt</p>
              <h4 className="text-lg font-semibold mt-4 mb-2">Contact</h4>
              <p>E-Mail: contact@dennisrauscher.de</p>
            </div>
          )}
          {type === 'privacy' && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Privacy Policy</h4>
              <p>
                We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.
              </p>
              <h4 className="text-lg font-semibold mt-4 mb-2">Data collection on our website</h4>
              <p>
                The use of our website is generally possible without providing personal data. As far as personal data (for example name, address or e-mail addresses) is collected on our pages, this is always done, as far as possible, on a voluntary basis.
              </p>
            </div>
          )}
          {type === 'terms' && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Terms of Use</h4>
              <p>
                Welcome to the AoM: God Chooser. By using this application, you agree to these terms of use.
              </p>
              <h4 className="text-lg font-semibold mt-4 mb-2">1. Acceptance of Terms</h4>
              <p>
                By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <h4 className="text-lg font-semibold mt-4 mb-2">2. Use License</h4>
              <p>
                Permission is granted to temporarily use this application for personal, non-commercial transitory viewing only.
              </p>
              <h4 className="text-lg font-semibold mt-4 mb-2">3. Disclaimer</h4>
              <p>
                The materials on this application are provided on an &quot;as is&quot; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}