import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Mic, Pause, Play, Trash2, Download, Share2, ArrowLeft, QrCode } from 'lucide-react';
import * as QRCode from 'qrcode';

export default function AudioHugPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [voiceVolume, setVoiceVolume] = useState(0.5); // 0 to 1
  const [musicVolume, setMusicVolume] = useState(0.5); // 0 to 1
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const mixedAudioRef = useRef<HTMLAudioElement | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        mediaRecorder.current = recorder;
        audioChunks.current = [];
        recorder.ondataavailable = (e) => audioChunks.current.push(e.data);
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp3' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          setSelectedVoice(null); // Clear AI voice if recording is used
          mixAudio();
          generateQrCode();
        };
        recorder.start();
        setIsRecording(true);
      })
      .catch(err => console.error('Recording error:', err));
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
      setSelectedVoice(null); // Clear AI voice if recording is deleted
    }
    if (mixedAudioRef.current) {
      URL.revokeObjectURL(mixedAudioRef.current.src);
      mixedAudioRef.current = null;
    }
    setQrCodeUrl(null);
  };

  const handleDownload = () => {
    if ((audioUrl || selectedVoice) && coverImage && mixedAudioRef.current) {
      const link = document.createElement('a');
      link.href = mixedAudioRef.current.src;
      link.download = `soul-hug-${Date.now()}.mp3`;
      link.click();
    }
  };

  const handleShare = () => {
    if (audioUrl || selectedVoice) {
      const shareUrl = `${window.location.origin}/hug/${Date.now()}`;
      navigator.clipboard.writeText(shareUrl);
      alert('Shareable link copied to clipboard!');
      generateQrCode();
    }
  };

  const handleEmail = () => {
    if (mixedAudioRef.current) {
      const subject = 'Your Soul Hug';
      const body = `Here's your personalized audio hug! Download it here: ${mixedAudioRef.current.src}\n(Note: This link works locally; upload to a server for sharing.)`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      alert('Email client opened. Upload the audio to a server for the link to work externally.');
    }
  };

  const musicOptions = [
    { name: 'Gentle Piano', url: '/mock/gentle-piano.mp3' },
    { name: 'Soothing Flute', url: '/mock/soothing-flute.mp3' },
    { name: 'Calm Strings', url: '/mock/calm-strings.mp3' },
    { name: 'Peaceful Harp', url: '/mock/peaceful-harp.mp3' },
    { name: 'Serene Waves', url: '/mock/serene-waves.mp3' },
  ];

  const voiceOptions = [
    { value: 'female-warm', label: 'Female - Warm & Caring', url: '/mock/female-warm.mp3' },
    { value: 'male-gentle', label: 'Male - Gentle & Sincere', url: '/mock/male-gentle.mp3' },
    { value: 'neutral-calm', label: 'Neutral - Calm & Soothing', url: '/mock/neutral-calm.mp3' },
  ];

  const selectVoice = (value: string) => {
    const voice = voiceOptions.find(v => v.value === value);
    setSelectedVoice(voice ? voice.url : null);
    setAudioUrl(null); // Clear recording if AI voice is selected
    mixAudio();
    generateQrCode();
  };

  const mixAudio = () => {
    if (!mixedAudioRef.current) {
      mixedAudioRef.current = new Audio();
    }
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gainNode = context.createGain();
    const voiceSource = audioUrl || selectedVoice;
    if (voiceSource && selectedMusic) {
      const voiceResponse = fetch(voiceSource).then(res => res.arrayBuffer());
      const musicResponse = fetch(selectedMusic).then(res => res.arrayBuffer());
      Promise.all([voiceResponse, musicResponse]).then(([voiceBuffer, musicBuffer]) => {
        context.decodeAudioData(voiceBuffer, (voiceDecoded) => {
          context.decodeAudioData(musicBuffer, (musicDecoded) => {
            const voiceBufferSource = context.createBufferSource();
            const musicBufferSource = context.createBufferSource();
            voiceBufferSource.buffer = voiceDecoded;
            musicBufferSource.buffer = musicDecoded;
            voiceBufferSource.connect(gainNode);
            musicBufferSource.connect(gainNode);
            gainNode.connect(context.destination);
            voiceBufferSource.start(0);
            musicBufferSource.start(0);
            const offlineContext = new OfflineAudioContext(2, 44100 * 5, 44100); // 5 seconds
            const offlineGain = offlineContext.createGain();
            const offlineVoice = offlineContext.createBufferSource();
            const offlineMusic = offlineContext.createBufferSource();
            offlineVoice.buffer = voiceDecoded;
            offlineMusic.buffer = musicDecoded;
            offlineVoice.connect(offlineGain, 0, 0);
            offlineMusic.connect(offlineGain, 0, 1);
            offlineGain.gain.value = voiceVolume; // Mock mixing logic
            offlineGain.connect(offlineContext.destination);
            offlineVoice.start(0);
            offlineMusic.start(0);
            offlineContext.startRendering().then(renderedBuffer => {
              const wav = audioBufferToWav(renderedBuffer);
              const blob = new Blob([wav], { type: 'audio/wav' });
              mixedAudioRef.current!.src = URL.createObjectURL(blob);
            });
          });
        });
      });
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const length = buffer.length * numChannels * bytesPerSample + 44;
    const bufferArray = new ArrayBuffer(length);
    const view = new DataView(bufferArray);
    const writeString = (str: string, offset: number) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };
    writeString('RIFF', 0);
    view.setUint32(4, length - 8, true);
    writeString('WAVE', 8);
    writeString('fmt ', 12);
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * bytesPerSample, true);
    view.setUint16(32, numChannels * bytesPerSample, true);
    view.setUint16(34, bitDepth, true);
    writeString('data', 36);
    view.setUint32(40, length - 44, true);
    return bufferArray;
  };

  const generateQrCode = () => {
    if (qrCanvasRef.current && (audioUrl || selectedVoice)) {
      const canvas = qrCanvasRef.current;
      const shareUrl = `${window.location.origin}/hug/${Date.now()}`;
      QRCode.toCanvas(canvas, shareUrl, {
        width: 128,
        height: 128,
        color: { dark: '#000000', light: '#ffffff' },
      }, (error) => {
        if (error) console.error('QR Code generation error:', error);
        setQrCodeUrl(shareUrl);
      });
    }
  };

  useEffect(() => {
    if (audioUrl || selectedVoice || selectedMusic) {
      mixAudio();
    }
  }, [audioUrl, selectedVoice, selectedMusic, voiceVolume, musicVolume]);

  return (
    <div className="min-h-screen pt-8 pb-16 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-8">
            CREATE YOUR AUDIO HUG
          </h1>
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-gray-50 to-teal-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Mic className="w-6 h-6 mr-2 text-teal-600" /> Record or Choose AI Voice
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                <button
                  onClick={startRecording}
                  disabled={isRecording || !!audioUrl || !!selectedVoice}
                  className="flex items-center px-5 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <Mic className="w-5 h-5 mr-2" /> Record
                </button>
                <button
                  onClick={stopRecording}
                  disabled={!isRecording}
                  className="flex items-center px-5 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <Pause className="w-5 h-5 mr-2" /> Stop
                </button>
                {audioUrl && (
                  <>
                    <a
                      href={audioUrl}
                      className="flex items-center px-5 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
                    >
                      <Play className="w-5 h-5 mr-2" /> Play
                    </a>
                    <button
                      onClick={deleteRecording}
                      className="flex items-center px-5 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
                    >
                      <Trash2 className="w-5 h-5 mr-2" /> Delete
                    </button>
                  </>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <select
                  value={selectedVoice || ''}
                  onChange={(e) => selectVoice(e.target.value)}
                  className="w-full sm:w-auto p-2 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                >
                  <option value="">Select AI Voice</option>
                  {voiceOptions.map((voice) => (
                    <option key={voice.value} value={voice.value}>
                      {voice.label}
                    </option>
                  ))}
                </select>
                {selectedVoice && (
                  <audio
                    controls
                    src={selectedVoice}
                    className="w-full sm:w-auto mt-2 sm:mt-0"
                  />
                )}
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg> Background Music
              </h3>
              <select
                value={selectedMusic || ''}
                onChange={(e) => setSelectedMusic(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              >
                <option value="">Select Music</option>
                {musicOptions.map((music) => (
                  <option key={music.name} value={music.url}>
                    {music.name}
                  </option>
                ))}
              </select>
              {selectedMusic && (
                <audio
                  controls
                  src={selectedMusic}
                  className="w-full mt-2"
                />
              )}
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v4h2v-4zm0 6h-2v2h2v-2z"/>
                </svg> Audio Mixer
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Voice Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={voiceVolume}
                    onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <span className="text-sm text-gray-600">{Math.round(voiceVolume * 100)}%</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Music Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <span className="text-sm text-gray-600">{Math.round(musicVolume * 100)}%</span>
                </div>
                {mixedAudioRef.current && (
                  <audio
                    ref={mixedAudioRef}
                    controls
                    className="w-full mt-2"
                  />
                )}
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zm-2-7h-6v-2h6v2z"/>
                </svg> Delivery & Sharing
              </h3>
              <div className="space-y-4">
                <button
                  onClick={handleShare}
                  disabled={!(audioUrl || selectedVoice)}
                  className="flex items-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed w-full justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" /> Copy Share Link
                </button>
                <button
                  onClick={handleEmail}
                  disabled={!mixedAudioRef.current}
                  className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed w-full justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg> Send via Email
                </button>
                <div className="flex flex-col items-center">
                  <canvas ref={qrCanvasRef} className="w-32 h-32" />
                  {qrCodeUrl && <p className="text-sm text-gray-600 mt-2">Scan to share</p>}
                </div>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-50 to-yellow-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0-4c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2z"/>
                </svg> Cover Image
              </h3>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setCoverImage(url);
                  }
                }}
                className="w-full p-2 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
              />
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="w-full h-32 object-cover rounded-md mt-2"
                />
              )}
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <Link href="/craft">
                <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Craft
                </button>
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  disabled={!(audioUrl || selectedVoice) || !coverImage || !mixedAudioRef.current}
                  className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4 mr-2" /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}