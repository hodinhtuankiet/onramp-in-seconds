import React from "react"
import { Shield, QrCode, Clock } from "lucide-react"

export const FeaturePills: React.FC = () => {
    const features = [
        {
            icon: Shield,
            text: "Face ID Login",
            color: "text-green-400",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20"
        },
        {
            icon: QrCode,
            text: "Scan & Pay",
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20"
        },
        {
            icon: Clock,
            text: "Under 30 Seconds",
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20"
        }
    ]

    return (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-12">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className={`flex items-center space-x-1 sm:space-x-2 ${feature.bgColor} border ${feature.borderColor} rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs hover:scale-105 transition-all duration-200 shadow-sm backdrop-blur-sm`}
                >
                    <feature.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${feature.color}`} />
                    <span className="text-gray-200 font-medium">{feature.text}</span>
                </div>
            ))}
        </div>
    )
}