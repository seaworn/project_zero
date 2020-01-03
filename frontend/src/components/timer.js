import React, { useState, useEffect } from 'react';

export default function Timer({label}) {

    const [time, setTime] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setTime(time + 1), 1000);
        return () => clearInterval(timer);
    });
    return (<span>{`${label}: ${new Date(time * 1000).toISOString().substr(11, 8)}`}</span>);
}
