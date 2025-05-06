import React, { useState } from 'react';

const Navbar = (props) => {
    const [formData, setFormData] = useState({
        zipCode: ''
    });
    const [isValid, setIsValid] = useState('not-set')
    const { checkClassActive, setActiveTab, handleSubmit, showAlert, setShowAlert } = props;
    const validateAndSubmit = (e) => {
        e.preventDefault()
        if (isValid === 'is-valid') {
            handleSubmit(formData.zipCode)
        }
    }
    const changeValidate = (value) => {
        setFormData({ zipCode: value })
    }
    const handleBlur = () => {
        const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/
        const test = zipRegex.test(formData.zipCode)
        if (test) {
            setIsValid('is-valid')
        } else if (!test && isValid) {
            setIsValid('is-invalid')
        }
    }

    return (
        <div className="container" style={{
            backgroundImage: "url('https://apod.nasa.gov/apod/image/2204/Z62_5747-Edit1090.jpg')",
            height: 'calc(100vh - 100px)',
            padding: '0px',
            margin: '0px',
            backgroundSize: 'cover',
            maxWidth: '100%'
        }}>
            <div className="container" style={{ color: 'white', paddingTop: '100px', display: 'flex', justifyContent: 'center' }}>
                <h1>Weather App</h1>
            </div>
            <div className='container' style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>'
                <button style={{ margin: '10px' }} type="button" className={checkClassActive('c')} onClick={() => setActiveTab('c')}>
                    Current
                </button>
                <button style={{ margin: '10px' }} type="button" className={checkClassActive('f')} onClick={() => setActiveTab('f')}>
                    Forecast
                </button>
                <button style={{ margin: '10px' }} type="button" className={checkClassActive('a')} onClick={() => setActiveTab('a')}>
                    Alerts
                </button>
            </div>
            <div className="container">
                <form onSubmit={validateAndSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label style={{ color: 'white', paddingTop: '30px', display: 'flex', justifyContent: 'center' }} htmlFor="zipCode" className="form-label">Enter your zip code to get started!</label>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <input
                                key={isValid}
                                value={formData.zipCode}
                                onChange={(e) => changeValidate(e.target.value)}
                                onBlur={e => handleBlur()}
                                style={{ width: '50%', borderRadius: '8px 0px 0px 8px' }}
                                type="text"
                                className={`form-control ${isValid}`}
                                id="zipCode"
                                name="zipCode"
                                required
                            />
                            <button style={{ borderRadius: '0px 8px 8px 0px' }} type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        {showAlert &&
                            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '50%' }} className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Holy guacamole!</strong> Something went wrong. Please try again later!
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                                </div>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Navbar;