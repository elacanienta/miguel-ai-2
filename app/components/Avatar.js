'use client';

export default function Avatar({ isSpeaking }) {
  const avatarUrl = 'https://models.readyplayer.me/693f7a76fe6f676b663b7cc4.glb';
  
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl overflow-hidden">
      <iframe
        src={`https://models.readyplayer.me/render?model=${avatarUrl}&scene=fullbody-portrait-v1&quality=high&background=transparent`}
        className="w-full h-full border-0"
        allow="camera; microphone"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}
