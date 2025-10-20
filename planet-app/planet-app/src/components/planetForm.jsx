// PlanetForm.jsx

import React, { useState } from 'react';

const PlanetForm = ({ onAddPlanet }) => {
    // 1. Состояние для названия планеты
    const [title, setTitle] = useState('');
    // 2. Состояние для выбранного цвета (по умолчанию черный)
    const [color, setColor] = useState('#000000');
    // 3. Состояние для файла изображения (объект File)
    const [imageFile, setImageFile] = useState(null);
    // 4. Состояние для URL изображения (для предпросмотра)
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            alert("Пожалуйста, введите название планеты.");
            return;
        }

        // Если файл выбран, используем его URL для отображения
        // В противном случае используем 'default.jpg'
        const imgSource = imagePreviewUrl || "default.jpg"; 

        // Создаем объект с данными новой планеты
        const newPlanetData = {
            title: title.trim(),
            color: color,
            rating: 0, // По умолчанию 0 звезд
            img: imgSource // Теперь это URL или 'default.jpg'
        };

        onAddPlanet(newPlanetData); // Передаем объект наверх

        // Очищаем форму
        setTitle('');
        setColor('#000000');
        setImageFile(null);
        setImagePreviewUrl('');
    };

    // Обработчик изменения файла
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Создаем временный URL для предпросмотра изображения
            setImagePreviewUrl(URL.createObjectURL(file)); 
        } else {
            setImageFile(null);
            setImagePreviewUrl('');
        }
    };

    return ( 
        <form onSubmit={handleSubmit} style={{ 
            margin: '20px', 
            padding: '20px', 
            border: '1px solid #ccc', 
            borderRadius: '8px',
            backgroundColor: '#999'
        }}>
            <h2>Add a new planet</h2>
            <div>
                <label>Enter a planet name:</label>
                <input 
                    type="text" 
                    placeholder="Enter a planet name" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    style={{ marginLeft: '10px' }}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Planet's color:</label>
                <input 
                    type="color" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)} 
                    style={{ marginLeft: '10px', width: '50px', height: '30px' }}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Image:</label>
                <input 
                    type="file" 
                    accept="image/*" // Принимаем только изображения
                    onChange={handleImageChange} 
                    style={{ marginLeft: '10px' }}
                />
                {/* Предпросмотр изображения */}
                {imagePreviewUrl && (
                    <img src={imagePreviewUrl} alt="Предпросмотр" width="50" height="50" style={{ marginLeft: '10px', verticalAlign: 'middle' }}/>
                )}
            </div>
            <button type="submit" style={{ marginTop: '20px', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Add planet
            </button>
        </form>
    );
};
 
export default PlanetForm;