import React, { useState } from 'react';
import axios from 'axios';
import WeatherTabResults from './components/WeatherTabResults';
import Navbar from './components/Navbar';

function App() {
    const [activeTab, setActiveTab] = useState('c');
    const [activeTabData, setActiveTabData] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const checkClassActive = (tab) => {
        return `btn btn-${tab === activeTab ? 'primary' : 'dark'}`;
    };

    const handleSubmit = async (zipCode) => {
        let url = 'http://localhost:9000';
        switch (activeTab) {
            case 'f':
                url += `/forecast?location=${zipCode}&days=3`;
                break;
            case 'c':
                url += `/current?location=${zipCode}`;
                break;
            case 'a':
                url += `/alerts?location=${zipCode}`;
                break;
            default:
                return;
        }

        try {
            const response = await axios.get(url);
            console.log("Data received from server:", response.data); 
            setActiveTabData(prev => ({ ...prev, [activeTab]: response.data }));
            setShowAlert(false);
        } catch (error) {
            console.error("API call failed:", error);
            setShowAlert(true);
        }       
    };

    return (
        <div>
            <Navbar
                handleSubmit={handleSubmit}
                checkClassActive={checkClassActive}
                setActiveTab={setActiveTab}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            {Object.keys(activeTabData).length > 0 &&
                <WeatherTabResults
                    activeTab={activeTab}
                    activeTabData={activeTabData}
                />
            }
            <div style={{ width: '100vw', height: '100px', backgroundColor: "black" }}>
                <div className="container">
                    <p style={{ color: 'white', paddingTop: '25px' }}>
                        Weather App. CSU
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
