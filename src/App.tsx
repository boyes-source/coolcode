import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorOption {
  name: string;
  code: string;
  preview: string;
  type: 'foreground' | 'background';
}

interface StyleOption {
  name: string;
  code: string;
}

const foregroundColors: ColorOption[] = [
  { name: 'Dark Gray', code: '30', preview: '#4f545c', type: 'foreground' },
  { name: 'Red', code: '31', preview: '#dc322f', type: 'foreground' },
  { name: 'Yellowish Green', code: '32', preview: '#859900', type: 'foreground' },
  { name: 'Gold', code: '33', preview: '#b58900', type: 'foreground' },
  { name: 'Light Blue', code: '34', preview: '#268bd2', type: 'foreground' },
  { name: 'Pink', code: '35', preview: '#d33682', type: 'foreground' },
  { name: 'Teal', code: '36', preview: '#2aa198', type: 'foreground' },
  { name: 'White', code: '37', preview: '#ffffff', type: 'foreground' },
];

const backgroundColors: ColorOption[] = [
  { name: 'Blueish Black', code: '40', preview: '#002b36', type: 'background' },
  { name: 'Rust Brown', code: '41', preview: '#cb4b16', type: 'background' },
  { name: 'Gray 40%', code: '42', preview: '#586e75', type: 'background' },
  { name: 'Gray 45%', code: '43', preview: '#657b83', type: 'background' },
  { name: 'Light Gray 55%', code: '44', preview: '#839496', type: 'background' },
  { name: 'Blurple', code: '45', preview: '#6c71c4', type: 'background' },
  { name: 'Light Gray 60%', code: '46', preview: '#93a1a1', type: 'background' },
  { name: 'Cream White', code: '47', preview: '#fdf6e3', type: 'background' },
];

const textStyles: StyleOption[] = [
  { name: 'Bold', code: '1' },
  { name: 'Underline', code: '4' },
];

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedForeground, setSelectedForeground] = useState<ColorOption | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<ColorOption | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateColoredText = (): string => {
    if (!inputText.trim()) return '';

    const codes: string[] = [];

    if (selectedStyles.length > 0) {
      codes.push(...selectedStyles);
    }

    if (selectedForeground) {
      codes.push(selectedForeground.code);
    }

    if (selectedBackground) {
      codes.push(selectedBackground.code);
    }

    if (codes.length === 0) {
      return `\`\`\`ansi\n${inputText}\n\`\`\``;
    }

    const ansiCode = `\u001b[${codes.join(';')}m`;
    const resetCode = '\u001b[0m';

    return `\`\`\`ansi\n${ansiCode}${inputText}${resetCode}\n\`\`\``;
  };

  const outputText = generateColoredText();

  const copyToClipboard = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleStyle = (code: string) => {
    setSelectedStyles((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
  };

  const clearAll = () => {
    setSelectedForeground(null);
    setSelectedBackground(null);
    setSelectedStyles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-200 via-yellow-100 to-pink-200 p-2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4 mt-6">
          <h1 className="text-6xl font-black text-red-600 mb-2 transform -rotate-2" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '3px 3px 0px #00ff00, 6px 6px 0px #0000ff' }}>
            ⭐ Aarav's Coloured Text Generator ⭐
          </h1>
          <p className="text-purple-700 text-xl font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            ~*~ make cool discord text!!! ~*~
          </p>
          <marquee className="text-blue-600 font-bold mt-2">WELCOME TO MY WEBSITE!!! THIS IS SO COOL!!!</marquee>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div>
            <div className="bg-cyan-300 border-4 border-dashed border-purple-500 p-3 mb-3 transform rotate-1">
              <label className="block text-orange-600 font-black mb-2 text-2xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                ✏️ Type ur text here!!!
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="type something cool..."
                className="w-full h-24 px-2 py-2 bg-yellow-100 border-4 border-blue-500 text-black text-lg"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              />
              {(selectedForeground || selectedBackground || selectedStyles.length > 0) && (
                <button
                  onClick={clearAll}
                  className="mt-2 px-3 py-1 bg-red-400 border-2 border-black text-sm font-bold hover:bg-red-500"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  CLEAR ALL!!!
                </button>
              )}
            </div>

            <div className="bg-pink-300 border-4 border-dotted border-green-600 p-3 mb-3 transform -rotate-1">
              <label className="block text-blue-700 font-black mb-2 text-xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                💪 Make it BOLD or underline
              </label>
              <div className="flex gap-2">
                {textStyles.map((style) => (
                  <button
                    key={style.code}
                    onClick={() => toggleStyle(style.code)}
                    className={`px-4 py-2 border-3 border-black font-black ${
                      selectedStyles.includes(style.code)
                        ? 'bg-lime-400 scale-110'
                        : 'bg-orange-300'
                    }`}
                    style={{ fontFamily: 'Comic Sans MS, cursive', transform: style.code === '1' ? 'rotate(-3deg)' : 'rotate(2deg)' }}
                  >
                    {style.name}!!!
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-yellow-200 border-4 border-double border-red-600 p-3 mb-3 transform rotate-1">
              <label className="block text-green-700 font-black mb-3 text-xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                🎨 TEXT COLOR (pick one!)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {foregroundColors.map((color, idx) => (
                  <button
                    key={color.code}
                    onClick={() =>
                      setSelectedForeground(
                        selectedForeground?.code === color.code ? null : color
                      )
                    }
                    className={`p-2 border-3 border-black ${
                      selectedForeground?.code === color.code
                        ? 'ring-4 ring-yellow-400 scale-105'
                        : ''
                    }`}
                    style={{ transform: `rotate(${(idx % 2 === 0 ? -2 : 2)}deg)` }}
                  >
                    <div
                      className="w-full h-8 border-2 border-black mb-1"
                      style={{ backgroundColor: color.preview }}
                    />
                    <div className="text-[9px] font-bold text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-orange-200 border-4 border-solid border-blue-700 p-3 transform -rotate-1">
              <label className="block text-red-700 font-black mb-3 text-xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                🌈 BACKGROUND COLOR!!!
              </label>
              <div className="grid grid-cols-4 gap-2">
                {backgroundColors.map((color, idx) => (
                  <button
                    key={color.code}
                    onClick={() =>
                      setSelectedBackground(
                        selectedBackground?.code === color.code ? null : color
                      )
                    }
                    className={`p-2 border-3 border-black ${
                      selectedBackground?.code === color.code
                        ? 'ring-4 ring-pink-400 scale-105'
                        : ''
                    }`}
                    style={{ transform: `rotate(${(idx % 2 === 0 ? 1 : -1)}deg)` }}
                  >
                    <div
                      className="w-full h-8 border-2 border-black mb-1"
                      style={{ backgroundColor: color.preview }}
                    />
                    <div className="text-[9px] font-bold text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-lime-300 border-4 border-dashed border-orange-600 p-3 mb-3 transform rotate-1">
              <div className="flex justify-between items-center mb-2">
                <label className="text-purple-700 font-black text-2xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  📋 UR CODE!!!
                </label>
                <button
                  onClick={copyToClipboard}
                  disabled={!outputText}
                  className={`flex items-center gap-1 px-3 py-2 border-3 border-black font-black ${
                    outputText
                      ? 'bg-green-400 hover:bg-green-500'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      COPIED!!!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      COPY IT!
                    </>
                  )}
                </button>
              </div>
              <div className="bg-white border-4 border-black p-3 min-h-32 font-mono text-xs break-all">
                {outputText || (
                  <span className="text-gray-400">ur text will show up here lol...</span>
                )}
              </div>
            </div>

            <div className="bg-purple-200 border-4 border-dotted border-pink-600 p-3 mb-3 transform -rotate-1">
              <label className="text-orange-700 font-black text-xl mb-2 block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                👀 what u picked:
              </label>
              <div className="space-y-2 text-sm">
                {selectedStyles.length > 0 && (
                  <div className="font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    Style: {selectedStyles.map((code) => textStyles.find((s) => s.code === code)?.name).join(', ')}
                  </div>
                )}
                {selectedForeground && (
                  <div className="flex items-center gap-2 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    Text Color:
                    <div
                      className="w-5 h-5 border-2 border-black"
                      style={{ backgroundColor: selectedForeground.preview }}
                    />
                    {selectedForeground.name}
                  </div>
                )}
                {selectedBackground && (
                  <div className="flex items-center gap-2 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    Background:
                    <div
                      className="w-5 h-5 border-2 border-black"
                      style={{ backgroundColor: selectedBackground.preview }}
                    />
                    {selectedBackground.name}
                  </div>
                )}
                {!selectedForeground && !selectedBackground && selectedStyles.length === 0 && (
                  <p className="text-gray-600 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    nothing selected yet!
                  </p>
                )}
              </div>
            </div>

            <div className="bg-cyan-200 border-4 border-solid border-red-500 p-3 transform rotate-1">
              <h3 className="text-green-700 font-black text-xl mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                ❓ HOW 2 USE:
              </h3>
              <ol className="space-y-1 text-sm font-bold list-decimal list-inside" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                <li className="text-blue-600">type ur message in da box</li>
                <li className="text-red-600">pick if u want bold or underline</li>
                <li className="text-purple-600">click a text color</li>
                <li className="text-orange-600">click a background color (optional!)</li>
                <li className="text-green-600">copy the code and paste in discord!!!</li>
              </ol>
              <p className="mt-3 text-xs text-gray-700 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                NOTE: it uses ANSI codes so it works in discord :D
              </p>
            </div>

            <div className="bg-yellow-300 border-4 border-dashed border-blue-500 p-2 mt-3 text-center transform -rotate-1">
              <p className="text-red-600 font-black text-sm animate-pulse" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                🔥 THIS WEBSITE IS AWESOME!!! 🔥
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 mb-6">
          <p className="text-xs text-gray-600 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            made by aarav in 2024 | coolest website ever
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="text-2xl animate-bounce">⭐</span>
            <span className="text-2xl animate-bounce delay-100">🎉</span>
            <span className="text-2xl animate-bounce delay-200">🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
