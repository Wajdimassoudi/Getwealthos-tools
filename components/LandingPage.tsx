'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Sparkles, Zap, Globe } from 'lucide-react'

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setLoaded(true)
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-5"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Logo Animation */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-24 h-24 animate-float">
              {/* Logo background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
              
              {/* Logo circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center border border-white/20 backdrop-blur-xl">
                <div className="text-white text-4xl font-black">⚡</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black text-center mb-6 animate-fade-in-slow">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              tools OS go
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 text-center mb-4 max-w-2xl animate-fade-in-slower leading-relaxed">
            منصة أدوات مجانية عصرية وسهلة الاستخدام
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-400 text-center max-w-xl mb-12 animate-fade-in-slower">
            تحميل الفيديوهات، صنع الشعارات، تعرف على الموسيقى، وأكثر من ذلك - الكل في مكان واحد
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12 animate-fade-in-slow max-w-2xl">
            {[
              { icon: Zap, label: 'سريع جداً' },
              { icon: Sparkles, label: 'حديث وجميل' },
              { icon: Globe, label: 'متعدد اللغات' },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-2 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-white font-medium">{feature.label}</span>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <button
            onClick={onEnter}
            className="group relative px-8 py-4 mb-8 font-bold text-lg rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg shadow-cyan-500/50 animate-bounce-slow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <span>ابدأ الآن</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 animate-pulse">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-slide"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes fade-in-slow {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-slower {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes slide {
          0% { transform: translateY(0); }
          50% { transform: translateY(5px); }
          100% { transform: translateY(0); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in-slow {
          animation: fade-in-slow 1s ease-out 0.3s both;
        }

        .animate-fade-in-slower {
          animation: fade-in-slower 1s ease-out 0.6s both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-slide {
          animation: slide 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
