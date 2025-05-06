import React from 'react';

const Alert = (props) => {
    const { activeTabData } = props;
    if (activeTabData) {
        return (
            <div className='container'>
                <div>
                <h2>
                        Weather Alerts at <b>{`${activeTabData.location.name} - ${activeTabData.location.region}`}</b>
                    </h2>
                </div>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                {activeTabData.alerts && activeTabData.alerts.alert && activeTabData.alerts.alert.map((alert, index) => {
                        return (
                            <div key={index} className="card" style={{ width: "18rem", margin: '20px' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{alert.event}</h5>
                                    <h5 className="card-title">
                                        {alert.areas}
                                    </h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">
                                        {alert.headline}
                                    </h6>
                                    <p className="card-text">
                                        {alert.desc}
                                    </p>
                                    <p className="card-text">
                                        {alert.instruction}
                                    </p>
                                    <p className="card-text">
                                        effective: {alert.effective}
                                    </p>
                                    <p className="card-text">
                                        expires: {alert.expires}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    } else {
        return null
    }

};

export default Alert;