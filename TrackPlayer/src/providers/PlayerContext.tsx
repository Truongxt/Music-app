import type { Track } from "@/src/constants/types";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioPlayerContextType {
  currentTrack: Track | null;
  queue: Track[];
  currentIndex: number;
  playTrack: (tracks: Track[] | Track, indexInQueue?: number) => Promise<void>;
  playNext: () => Promise<void>;
  playPrev: () => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  seek: (position: number) => Promise<void>;
  status: ReturnType<typeof useAudioPlayerStatus> | null;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = useAudioPlayer(null, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);

  const queueRef = useRef<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const seek = async (position: number) => {
    try {
      await player.seekTo(position);
    } catch (e) {
      console.warn("Seek error:", e);
    }
  };

  const playTrack = async (tracks: Track[] | Track, indexInQueue = 0) => {
    if (Array.isArray(tracks)) {
      queueRef.current = tracks;
      setCurrentIndex(indexInQueue);
      setCurrentTrack(tracks[indexInQueue]);
      player.replace(tracks[indexInQueue].file);
    } else {
      queueRef.current = [tracks];
      setCurrentIndex(0);
      setCurrentTrack(tracks);
      player.replace(tracks.file);
    }
    player.play();
  };

  const playNext = useCallback(async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < queueRef.current.length) {
      setCurrentIndex(nextIndex);
      setCurrentTrack(queueRef.current[nextIndex]);
      player.replace(queueRef.current[nextIndex].file);
      player.play();
    }
  }, [currentIndex, player]);

  const playPrev = async () => {
    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
    setCurrentIndex(prevIndex);
    setCurrentTrack(queueRef.current[prevIndex]);
    player.replace(queueRef.current[prevIndex].file);
    player.play();
  };

  const pause = async () => player.pause();
  const resume = async () => player.play();

  useEffect(() => {
    if (status?.didJustFinish) {
      void playNext();
    }
  }, [status?.didJustFinish, playNext]);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        queue: queueRef.current,
        currentIndex,
        playTrack,
        playNext,
        playPrev,
        pause,
        resume,
        status,
        seek
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayerGlobal() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx)
    throw new Error("useAudioPlayerGlobal must be used within provider");
  return ctx;
}
