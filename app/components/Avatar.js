'use client';

export default function Avatar({ isSpeaking }) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
      <img
        src="https://models.readyplayer.me/693f7a76fe6f676b663b7cc4.png?scene=fullbody-portrait-v1&blendShapes[Wolf3D_Head]=0.5"
        alt="Miguel's 3D Avatar"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback if image fails
          e.target.outerHTML = `
            <div class="flex items-center justify-center w-full h-full">
              <div class="text-center">
                <div class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-3 shadow-xl">
                  M
                </div>
                <p class="text-sm text-gray-600 font-medium">Miguel</p>
                <p class="text-xs text-gray-400">CS Graduate • AI Specialist</p>
              </div>
            </div>
          `;
        }}
      />
    </div>
  );
}
