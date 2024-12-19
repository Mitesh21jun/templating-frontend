import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

function App() {
    const [template, setTemplate] = useState(null);
    const [logo, setLogo] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const canvasRef = useRef(null);

    const handleTemplateUpload = (e) => {
        setTemplate(URL.createObjectURL(e.target.files[0]));
    };

    const handleLogoUpload = (e) => {
        setLogo(URL.createObjectURL(e.target.files[0]));
    };

    const handlePhotoUpload = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
    };

    const handleGenerate = () => {
        if (!template || !logo || !photo || !companyName) {
            alert('Please fill all fields!');
            return;
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const templateImg = new Image();
        templateImg.src = template;
        templateImg.onload = () => {
            ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

            const logoImg = new Image();
            logoImg.src = logo;
            logoImg.onload = () => {
                ctx.drawImage(logoImg, 20, 20, 100, 100);

                const photoImg = new Image();
                photoImg.src = photo;
                photoImg.onload = () => {
                    ctx.drawImage(photoImg, canvas.width - 120, 20, 100, 100);

                    ctx.font = '20px Arial';
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.fillText(companyName, canvas.width / 2, canvas.height - 20);

                    alert('Creative generated successfully!');
                };
            };
        };
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'creative.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Brand Creative Generator</h1>
            </header>

            <main className="app-main">
                <div className="template-preview">
                    <canvas ref={canvasRef} width={600} height={400} className="canvas"></canvas>
                </div>

                <form className="customization-form">
                    <div>
                        <label htmlFor="template">Upload Template:</label>
                        <input type="file" id="template" accept="image/*" onChange={handleTemplateUpload} />
                    </div>
                    <div>
                        <label htmlFor="logo">Upload Logo:</label>
                        <input type="file" id="logo" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <div>
                        <label htmlFor="photo">Upload Photo:</label>
                        <input type="file" id="photo" accept="image/*" onChange={handlePhotoUpload} />
                    </div>
                    <div>
                        <label htmlFor="companyName">Company Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Enter company name"
                        />
                    </div>
                    <button type="button" onClick={handleGenerate}>
                        Generate Creative
                    </button>
                    <button type="button" onClick={handleDownload}>
                        Download Creative
                    </button>
                </form>
            </main>

            <footer className="app-footer">
                <p>&copy; 2024 Brand Creative Generator</p>
            </footer>
        </div>
    );
}
export default App