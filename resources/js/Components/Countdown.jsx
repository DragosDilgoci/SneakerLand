import React, { useState, useEffect } from "react";

function Countdown() {
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    function calculateRemainingTime() {
        const now = new Date();
        const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
        return endTime - now; 
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeLeft = calculateRemainingTime();
            if (timeLeft <= 0) {
                clearInterval(intervalId);
                setRemainingTime(0);
            } else {
                setRemainingTime(timeLeft);
            }
        }, 1000); 

        return () => clearInterval(intervalId);
    }, []);

    function formatTime() {
        let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        let seconds = Math.floor((remainingTime / 1000) % 60);

        days = String(days).padStart(2, "0");
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
    }

    return (
        <div className="countdown">
            <div className="display">{formatTime()}</div>
        </div>
    );
}

export default Countdown;
