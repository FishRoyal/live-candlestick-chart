import { useEffect, useRef, useState } from "react";

const TypingEffect = ({ text }: { text : string}) => {
    const [displayText, setDisplayText] = useState('');
    const currentIndex = useRef(0);
  
    useEffect(() => {
        setDisplayText('')
        const interval = setInterval(() => {
            if(currentIndex.current >= text.length - 1) {
                clearInterval(interval);
                currentIndex.current = 0;
                return;
            }
            setDisplayText((prevText) => {
            const nextChar = text[currentIndex.current];
            if(currentIndex.current < text.length - 1) {
                currentIndex.current++;
            }
            return prevText + nextChar;
            });
        }, 100);
    
        return () => clearInterval(interval);
    }, [text]);
  
    return <div className="typingEffect">{displayText}</div>;
  };


export default TypingEffect;