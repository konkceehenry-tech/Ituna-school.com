import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { CameraIcon } from './icons/CameraIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { SparklesIcon } from './icons/SparklesIcon';

type ActiveTool = 'image' | 'audio';

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

const ImageAnalyzer = () => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) { // 4MB limit
                setError('File size must be less than 4MB.');
                return;
            }
            setError('');
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image || !prompt.trim() || isLoading) return;
        
        setIsLoading(true);
        setResult('');
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const imagePart = await fileToGenerativePart(image);
            const textPart = { text: prompt };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
            });

            setResult(response.text);
        } catch (err) {
            console.error(err);
            setError('An error occurred while analyzing the image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center"><CameraIcon className="w-6 h-6 mr-3" /> Image Analyzer</h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div>
                        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300 mb-2">Upload Image</label>
                        <input
                            ref={fileInputRef}
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full text-center p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-sky-400 transition-colors">
                            {preview ? (
                                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-md" />
                            ) : (
                                <div className="text-gray-400">
                                    <CameraIcon className="w-12 h-12 mx-auto mb-2" />
                                    <span>Click to select an image</span>
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-300 mb-2">What do you want to know about this image?</label>
                            <textarea
                                id="image-prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., 'Identify this plant' or 'What historical period is this photo from?'"
                                rows={4}
                                className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                required
                            />
                        </div>
                        <button type="submit" disabled={isLoading || !image || !prompt} className="w-full py-2 px-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
                            {isLoading ? 'Analyzing...' : <><SparklesIcon className="w-5 h-5 mr-2" />Analyze Image</>}
                        </button>
                    </div>
                </div>
            </form>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            {(isLoading || result) && (
                 <div className="mt-6 p-4 bg-black/30 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Analysis Result:</h4>
                    {isLoading ? (
                        <div className="space-y-2">
                           <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                           <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                           <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                        </div>
                    ) : (
                        <p className="text-gray-300 whitespace-pre-wrap">{result}</p>
                    )}
                 </div>
            )}
        </div>
    );
};

const AudioTranscriber = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleStartRecording = async () => {
        if (isRecording) return;
        setTranscript('');
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = handleTranscription;
            audioChunksRef.current = [];
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setError("Could not access microphone. Please check your browser permissions.");
        }
    };
    
    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            // Stop all media tracks to turn off the recording indicator
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            setIsLoading(true); // Show loading while transcribing
        }
    };

    const handleTranscription = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], "recording.webm", { type: 'audio/webm' });
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const audioPart = await fileToGenerativePart(audioFile);
            const textPart = { text: "Transcribe this audio recording." };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [audioPart, textPart] },
            });
            
            setTranscript(response.text);
        } catch (err) {
            console.error(err);
            setError('An error occurred during transcription. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center"><MicrophoneIcon className="w-6 h-6 mr-3" /> Audio Transcriber</h3>
            <div className="flex justify-center gap-4 mb-4">
                <button
                    onClick={handleStartRecording}
                    disabled={isRecording}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Start Recording
                </button>
                <button
                    onClick={handleStopRecording}
                    disabled={!isRecording}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Stop Recording
                </button>
            </div>
             {isRecording && <p className="text-center text-yellow-400 animate-pulse">Recording in progress...</p>}
             {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
             {(isLoading || transcript) && (
                 <div className="mt-6 p-4 bg-black/30 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Transcript:</h4>
                    {isLoading ? (
                         <div className="space-y-2">
                           <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                           <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                        </div>
                    ) : (
                        <p className="text-gray-300 whitespace-pre-wrap">{transcript}</p>
                    )}
                 </div>
            )}
        </div>
    );
};

const AITools = () => {
    const [activeTool, setActiveTool] = useState<ActiveTool>('image');

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">AI Tools</h2>
            <div className="flex border-b border-gray-700 mb-6">
                <button 
                    onClick={() => setActiveTool('image')}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors ${activeTool === 'image' ? 'border-b-2 border-sky-400 text-sky-400' : 'text-gray-400 hover:text-white'}`}
                >
                    <CameraIcon className="w-5 h-5" /> Image Analyzer
                </button>
                <button 
                    onClick={() => setActiveTool('audio')}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors ${activeTool === 'audio' ? 'border-b-2 border-sky-400 text-sky-400' : 'text-gray-400 hover:text-white'}`}
                >
                    <MicrophoneIcon className="w-5 h-5" /> Audio Transcriber
                </button>
            </div>
            
            {activeTool === 'image' ? <ImageAnalyzer /> : <AudioTranscriber />}
        </div>
    );
};


export default AITools;
