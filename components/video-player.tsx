"use client"

import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any

interface VideoPlayerProps {
  url: string | null
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  if (!url) {
    return (
      <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center">
        <p className="text-white">Aucune vidéo disponible</p>
      </div>
    )
  }

  return (
    <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        playing={false}
      />
    </div>
  )
}
