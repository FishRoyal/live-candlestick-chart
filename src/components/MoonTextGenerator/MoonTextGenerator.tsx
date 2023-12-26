import { useEffect, useState } from "react";
import "./MoonTextGenerator.sass";
import TypingEffect from "./TypingEffect";

const moonText =   [
    "Bathed in silvery light, the moon whispers tranquility to the night.",
    "A celestial ballet, the moon pirouettes across the velvet sky.",
    "The moon cradles the stars in its gentle glow, a cosmic lullaby for the cosmos.",
    "Velvet darkness adorned with the moon's soft, luminous embrace.",
    "Serenading the night, the moon conducts a symphony of dreams.",
    "Luna's radiance paints the world in shades of serenity.",
    "Each crater on the moon tells a story, etched in the quiet elegance of lunar landscapes.",
    "The moon's reflection dances upon tranquil waters, creating ripples of celestial calm.",
    "In the lunar garden of dreams, wishes blossom under the soft glow of moonbeams.",
    "Moonlit whispers weave tales of magic, casting a spell upon the hearts of dreamers.",
    "The moon's glow is a celestial balm, soothing the world into a peaceful slumber.",
    "A nocturnal sentinel, the moon watches over the Earth with silent grace.",
    "Nightfall unfurls its celestial canvas, the moon at its luminous centerpiece.",
    "In the hushed night, the moon is a silent poet, penning verses in silver.",
    "Moonlight transforms ordinary landscapes into enchanted realms, inviting wonder.",
    "A celestial lantern, the moon guides lost souls back to the comfort of dreams.",
    "Wrapped in the moon's glow, the night sky becomes a tapestry of cosmic artistry.",
    "The moon's glow is a tranquil elixir, soothing the world into celestial serenity.",
    "Beneath the moon's watchful eye, the world sleeps, cradled in a celestial cocoon.",
    "The moon's phases are a celestial dance, a rhythmic heartbeat echoing through the cosmos."
]

const MoonTextGenerator = () => {

    const [phraseToType, setPhraseToType] = useState(moonText[0])

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseToType(moonText[Math.floor(Math.random() * (moonText.length - 1))])
        }, 20000)

        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <div className="moonTextGenerator">
            {phraseToType !== "" ? <TypingEffect text={phraseToType}/> : null}
        </div>
    )
}

export default MoonTextGenerator;