import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import QResults from './QResults';

const colorMapping = {
    A: 'green-dashboard',
    B: 'orange-dashboard',
    C: 'purple-dashboard',
    D: 'white-dashboard' // Default to white
};

export default function ColorCoding() {
    const [dashboardColor, setDashboardColor] = useState(colorMapping.D);

    useEffect(() => {
        const finalCategory = localStorage.getItem('finalCategory') || 'D';
        setDashboardColor(colorMapping[finalCategory]);
    }, []);

    return (
        <div className={dashboardColor}>
            <Dashboard />
        </div>
    );
} 
