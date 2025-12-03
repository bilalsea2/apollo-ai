"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CropType = "wheat" | "corn" | "tomato" | "carrot" | "lettuce" | "potato" | "sunflower" | "rice";
type CropStatus = "healthy" | "stressed" | "moderate" | "nutrient-deficient" | "water-stress";

interface Crop {
    id: number;
    type: CropType;
    status: CropStatus;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    isClicked: boolean;
}

const cropEmojis: Record<CropType, string> = {
    wheat: "🌾",
    corn: "🌽",
    tomato: "🍅",
    carrot: "🥕",
    lettuce: "🥬",
    potato: "🥔",
    sunflower: "🌻",
    rice: "🌱",
};

const statusColors: Record<CropStatus, string> = {
    healthy: "text-green-500",
    stressed: "text-red-500",
    moderate: "text-yellow-500",
    "nutrient-deficient": "text-orange-500",
    "water-stress": "text-blue-500",
};

const statusLabels: Record<CropStatus, string> = {
    healthy: "✅ Healthy",
    stressed: "🚨 High Stress",
    moderate: "⚠️ Moderate Stress",
    "nutrient-deficient": "🧪 Nutrient Deficiency",
    "water-stress": "💧 Water Stress",
};

const statusDescriptions: Record<CropStatus, string> = {
    healthy: "Optimal growth conditions detected. Continue current care routine.",
    stressed: "Critical stress detected! Immediate intervention required.",
    moderate: "Early signs of stress. Monitor closely and adjust care.",
    "nutrient-deficient": "Low nitrogen/phosphorus levels. Consider fertilization.",
    "water-stress": "Insufficient moisture. Increase irrigation schedule.",
};

const generateCrops = (): Crop[] => {
    const crops: Crop[] = [];
    const types: CropType[] = ["wheat", "corn", "tomato", "carrot", "lettuce", "potato", "sunflower", "rice"];

    const sections = [
        { xRange: [0, 25], yRange: [0, 50], dominantType: "wheat" as CropType },
        { xRange: [25, 50], yRange: [0, 50], dominantType: "corn" as CropType },
        { xRange: [50, 75], yRange: [0, 50], dominantType: "tomato" as CropType },
        { xRange: [75, 100], yRange: [0, 50], dominantType: "sunflower" as CropType },
        { xRange: [0, 25], yRange: [50, 100], dominantType: "rice" as CropType },
        { xRange: [25, 50], yRange: [50, 100], dominantType: "lettuce" as CropType },
        { xRange: [50, 75], yRange: [50, 100], dominantType: "carrot" as CropType },
        { xRange: [75, 100], yRange: [50, 100], dominantType: "potato" as CropType },
    ];

    let id = 0;
    sections.forEach((section) => {
        const cropsInSection = 15 + Math.floor(Math.random() * 10);
        for (let i = 0; i < cropsInSection; i++) {
            const x = section.xRange[0] + Math.random() * (section.xRange[1] - section.xRange[0]);
            const y = section.yRange[0] + Math.random() * (section.yRange[1] - section.yRange[0]);

            const type = Math.random() < 0.7 ? section.dominantType : types[Math.floor(Math.random() * types.length)];

            const statusWeights = Math.random();
            let status: CropStatus;
            if (statusWeights < 0.5) status = "healthy";
            else if (statusWeights < 0.7) status = "moderate";
            else if (statusWeights < 0.85) status = "stressed";
            else if (statusWeights < 0.95) status = "nutrient-deficient";
            else status = "water-stress";

            crops.push({
                id: id++,
                type,
                status,
                x,
                y,
                rotation: Math.random() * 30 - 15,
                scale: 0.8 + Math.random() * 0.4,
                isClicked: false,
            });
        }
    });

    return crops;
};

export const DroneScanner = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isInside, setIsInside] = useState(false);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [scannedCrops, setScannedCrops] = useState<Crop[]>([]);

    useEffect(() => {
        setCrops(generateCrops());
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    }, []);

    useEffect(() => {
        const coverageRadius = 12;
        const scanned = crops.filter(crop => {
            const dx = crop.x - mousePos.x;
            const dy = crop.y - mousePos.y;
            return Math.sqrt(dx * dx + dy * dy) < coverageRadius;
        });
        setScannedCrops(scanned);
    }, [mousePos, crops]);

    const handleCropClick = (cropId: number) => {
        setCrops(prev => prev.map(crop =>
            crop.id === cropId ? { ...crop, isClicked: true } : crop
        ));
        setTimeout(() => {
            setCrops(prev => prev.map(crop =>
                crop.id === cropId ? { ...crop, isClicked: false } : crop
            ));
        }, 600);
    };

    const scanStats = {
        total: scannedCrops.length,
        healthy: scannedCrops.filter(c => c.status === "healthy").length,
        stressed: scannedCrops.filter(c => c.status === "stressed").length,
        moderate: scannedCrops.filter(c => c.status === "moderate").length,
        nutrientDeficient: scannedCrops.filter(c => c.status === "nutrient-deficient").length,
        waterStress: scannedCrops.filter(c => c.status === "water-stress").length,
    };

    const overallStatus: CropStatus =
        scanStats.stressed > 0 ? "stressed" :
            scanStats.waterStress > 0 ? "water-stress" :
                scanStats.nutrientDeficient > 0 ? "nutrient-deficient" :
                    scanStats.moderate > 0 ? "moderate" : "healthy";

    return (
        <div className="relative w-full max-w-5xl mx-auto">
            <div className="text-center mb-4">
                <span className="text-sm text-muted-foreground">🎮 Move your cursor to fly the drone and scan crops!</span>
            </div>

            <div
                ref={containerRef}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-none border-4 border-green-600/30 shadow-2xl"
                style={{
                    background: "linear-gradient(180deg, #87CEEB 0%, #87CEEB 20%, #8B7355 20%, #8B7355 22%, #228B22 22%, #228B22 100%)",
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsInside(true)}
                onMouseLeave={() => setIsInside(false)}
            >
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, #654321 1px, transparent 1px),
                              radial-gradient(circle at 80% 30%, #654321 1px, transparent 1px),
                              radial-gradient(circle at 40% 70%, #654321 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                {crops.map((crop) => (
                    <motion.div
                        key={crop.id}
                        className="absolute cursor-pointer select-none"
                        style={{
                            left: `${crop.x}%`,
                            top: `${crop.y}%`,
                            transform: `translate(-50%, -50%) rotate(${crop.rotation}deg)`,
                            fontSize: `${crop.scale * 2}rem`,
                        }}
                        onClick={() => handleCropClick(crop.id)}
                        whileHover={{ scale: 1.3, rotate: crop.rotation + 10 }}
                        animate={crop.isClicked ? {
                            scale: [1, 1.5, 0.8, 1.2, 1],
                            rotate: [crop.rotation, crop.rotation + 360],
                            y: [0, -20, 0],
                        } : {}}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span className="drop-shadow-lg hover:drop-shadow-2xl transition-all">
                            {cropEmojis[crop.type]}
                        </span>
                    </motion.div>
                ))}

                <AnimatePresence>
                    {isInside && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute pointer-events-none"
                            style={{
                                left: `${mousePos.x}%`,
                                top: `${mousePos.y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="relative" style={{ width: "180px", height: "180px" }}>
                                <div className="absolute inset-0 rounded-full border-4 border-red-500 bg-red-500/20 animate-pulse" />
                                <div className="absolute inset-2 rounded-full border-2 border-red-400/50 animate-pulse" />
                                <div className="absolute inset-4 rounded-full border border-red-300/30 animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-red-500/40" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-0.5 h-full bg-red-500/40" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isInside && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="absolute pointer-events-none z-20"
                            style={{
                                left: `${mousePos.x}%`,
                                top: `${mousePos.y}%`,
                                transform: "translate(-50%, -100%)",
                            }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, 2, -2, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-5xl drop-shadow-2xl"
                            >
                                🚁
                            </motion.div>
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-400/50 rounded-full blur-sm animate-spin" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isInside && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className="absolute z-30 pointer-events-none"
                            style={{
                                left: `calc(${mousePos.x}% + 100px)`,
                                top: `${mousePos.y}%`,
                                transform: "translateY(-50%)",
                                maxWidth: "220px",
                            }}
                        >
                            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-green-600/30 p-3 text-xs">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                                    <span className="text-lg">📡</span>
                                    <span className="font-bold text-green-700">DRONE SCAN</span>
                                </div>

                                {scannedCrops.length > 0 ? (
                                    <>
                                        <div className={`font-semibold mb-2 ${statusColors[overallStatus]}`}>
                                            {statusLabels[overallStatus]}
                                        </div>

                                        <div className="space-y-1 mb-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Crops scanned:</span>
                                                <span className="font-medium">{scanStats.total}</span>
                                            </div>
                                            {scanStats.healthy > 0 && (
                                                <div className="flex justify-between text-green-600">
                                                    <span>✅ Healthy:</span>
                                                    <span>{scanStats.healthy}</span>
                                                </div>
                                            )}
                                            {scanStats.stressed > 0 && (
                                                <div className="flex justify-between text-red-500">
                                                    <span>🚨 Stressed:</span>
                                                    <span>{scanStats.stressed}</span>
                                                </div>
                                            )}
                                            {scanStats.moderate > 0 && (
                                                <div className="flex justify-between text-yellow-600">
                                                    <span>⚠️ Moderate:</span>
                                                    <span>{scanStats.moderate}</span>
                                                </div>
                                            )}
                                            {scanStats.nutrientDeficient > 0 && (
                                                <div className="flex justify-between text-orange-500">
                                                    <span>🧪 Nutrient:</span>
                                                    <span>{scanStats.nutrientDeficient}</span>
                                                </div>
                                            )}
                                            {scanStats.waterStress > 0 && (
                                                <div className="flex justify-between text-blue-500">
                                                    <span>💧 Water:</span>
                                                    <span>{scanStats.waterStress}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-[10px] text-gray-500 pt-2 border-t border-gray-200">
                                            {statusDescriptions[overallStatus]}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-gray-500 text-center py-2">
                                        <span className="text-2xl">🔍</span>
                                        <p className="mt-1">Move drone over crops to scan</p>
                                    </div>
                                )}

                                {scannedCrops.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-gray-200">
                                        <div className="text-[10px] text-gray-500 mb-1">Confidence</div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${85 + Math.random() * 10}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isInside && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                        <div className="bg-white/90 rounded-xl px-6 py-4 shadow-xl text-center">
                            <span className="text-4xl mb-2 block">🚁</span>
                            <p className="font-semibold text-green-700">Hover to deploy drone</p>
                            <p className="text-sm text-gray-500">Move cursor to scan crops</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Healthy</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-muted-foreground">Moderate</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-muted-foreground">Stressed</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-muted-foreground">Nutrient</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Water</span>
                </div>
            </div>
        </div>
    );
};
