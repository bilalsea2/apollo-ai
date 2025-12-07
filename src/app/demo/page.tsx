"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2, AlertTriangle, CheckCircle2, Leaf, AlertOctagon, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
// import * as onnx from 'onnxruntime-web'; // Uncomment when model is ready

export default function DemoPage() {
    const [image, setImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Simulation mode since we don't have the trained model file yet
    const simulateAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            // Random result simulation
            const scenarios = [
                { status: "Healthy", confidence: 0.98, color: "text-green-500", icon: CheckCircle2, desc: "Plant shows no signs of stress or disease." },
                { status: "Water Stress", confidence: 0.89, color: "text-blue-500", icon: Droplets, desc: "Leaves showing signs of dehydration. Irrigation recommended." },
                { status: "Nutrient Deficiency", confidence: 0.92, color: "text-orange-500", icon: AlertTriangle, desc: "Yellowing leaves indicate potential nitrogen deficiency." },
                { status: "Blight Disease", confidence: 0.95, color: "text-red-500", icon: AlertOctagon, desc: "Fungal infection detected. Immediate treatment required." },
            ];
            const randomResult = scenarios[Math.floor(Math.random() * scenarios.length)];

            setResult(randomResult);
            setIsAnalyzing(false);
        }, 2000);
    };

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 dotted-bg relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-transparent pointer-events-none" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass-card border-b border-green-500/10">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="h-5 w-5 text-neutral-600 group-hover:text-green-600 transition" />
                        <span className="font-medium text-neutral-600 group-hover:text-green-600 transition">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                            <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg">Apollo AI Demo</span>
                    </div>
                    <div className="w-[100px]" /> {/* Spacer for centering */}
                </div>
            </nav>

            <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
                        Plant Stress Detection
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Upload an image of a crop leaf to detect potential stress, disease, or nutrient deficiencies using our standard computer vision model.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Upload Section */}
                    <div className="space-y-6">
                        <Card
                            className={cn(
                                "group relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out cursor-pointer",
                                dragActive ? "border-green-500 bg-green-50 scale-[1.02]" : "border-neutral-200 hover:border-green-400 hover:bg-neutral-50",
                                image ? "bg-white" : ""
                            )}
                            onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                            onDragOver={(e) => { e.preventDefault(); }}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleChange}
                            />

                            {image ? (
                                <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src={image}
                                        alt="Uploaded crop"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white font-medium flex items-center gap-2">
                                            <Upload className="w-4 h-4" /> Change Image
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-neutral-500">
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-green-600" />
                                    </div>
                                    <p className="font-semibold text-neutral-900">Click to upload or drag and drop</p>
                                    <p className="text-sm mt-1">Supports JPG, PNG (Max 10MB)</p>
                                </div>
                            )}
                        </Card>

                        <Button
                            size="lg"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-6 shadow-lg shadow-green-600/20"
                            disabled={!image || isAnalyzing}
                            onClick={simulateAnalysis}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                                </>
                            ) : (
                                "Run Analysis"
                            )}
                        </Button>

                        <p className="text-xs text-center text-neutral-400">
                            *Prototype Version: Running in simulation mode (Model not loaded)
                        </p>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {!result && !isAnalyzing && (
                            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-neutral-400 border border-neutral-200 rounded-xl bg-white/50 border-dashed">
                                <Leaf className="w-12 h-12 mb-4 opacity-20" />
                                <p>Upload an image and run analysis to see results here.</p>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="space-y-4">
                                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 animate-[progress_2s_ease-in-out_infinite] w-full origin-left" />
                                </div>
                                <div className="grid gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-24 bg-white rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="p-6 border-green-100 bg-white/80 backdrop-blur shadow-xl">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-1">Detected Condition</h3>
                                            <div className="flex items-center gap-3">
                                                <result.icon className={cn("w-8 h-8", result.color)} />
                                                <h2 className={cn("text-3xl font-bold", result.color)}>{result.status}</h2>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-1">Confidence</div>
                                            <div className="text-2xl font-bold text-neutral-900">{(result.confidence * 100).toFixed(1)}%</div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-700">
                                        {result.desc}
                                    </div>
                                </Card>

                                <div className="grid gap-4">
                                    <h3 className="font-semibold text-neutral-900">Analysis Breakdown</h3>
                                    {['Healthy', 'Water Stress', 'Nutrient Deficiency', 'Disease'].map((item) => (
                                        <div key={item} className="flex items-center gap-4 text-sm">
                                            <span className="w-32 text-neutral-600">{item}</span>
                                            <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-1000",
                                                        item === result.status ? result.color.replace('text-', 'bg-') : "bg-neutral-200"
                                                    )}
                                                    style={{
                                                        width: item === result.status ? `${result.confidence * 100}%` : `${Math.random() * 15}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
