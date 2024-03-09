"use client"
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import Image from "next/image"

const sound = [
    {
        title: "Low Life",
        waveType: "Low_Life.mp3",
        audioUrl: "../audio/Low_Life.mp3"
    }
]

export default function music() {
    const [play, setPlay] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef()
    const Max_Volume = 20

    const toogleAudio = () => {
        if (play) {
            audioRef.current?.pause()
        } else {
            audioRef.current?.play()
        }
        setPlay(!play)
    }

    const handleVolumeChange = (e) => {
        const { value } = e.target
        const volume = Number(value) / Max_Volume;
        audioRef.current.volume = volume;
    }
    const selectTrack = (index) => {
        setCurrentTrackIndex(index)
        setPlay(false);

    }


    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            {sounds.map((sound, index) => (
                <div key={index} className="bg-accent flex h-fit max-w-fit flex-col rounded-lg border-2 border-cyan-700 pb-4 text-center shadow">
                    <Image
                        width={200}
                        height={200}
                        className="mx-auto max-h-48 w-full flex-shrink-0 rounded-t-lg pb-2"
                        src={sound.imageUrl}
                        alt="waves"
                    />
                    <button
                        onClick={() => selectTrack(index)}
                        type="button"
                        className="absolute right-5 left-0 top-[15%] m-auto w-9 rounded-full p-2 text-white shadow-sm"
                    >
                        {currentTrackIndex === index && play ? (
                            <PauseIcon className="h-12 w-12" aria-hidden="true" />
                        ) : (
                            <PlayIcon className="h-12 w-12" aria-hidden="true" />
                        )}
                    </button>
                    <div className="mt-1 flex flex-col p-4">
                        <p className="text-lg text-white">{sound.title}</p>
                    </div>
                    <div className="mx-4 flex">
                        <input
                            type="range"
                            className="mr-2 w-full accent-cyan-700"
                            min={0}
                            max={MAX_VOLUME}
                            onChange={handleVolumeChange}
                        />
                        <SpeakerWaveIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                </div>
            ))}
            <audio ref={audioRef} loop src={sound[currentTrackIndex].audioUrl} />
        </div>
    );
};