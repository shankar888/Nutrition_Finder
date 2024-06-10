import React, { useState } from 'react';
import axios from 'axios';

const NutritionForm = () => {
    const [query, setQuery] = useState('');
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setNutrition(null);

        try {
            const response = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
                headers: {
                    'X-Api-Key': '+8fiFOFu22Xv0dAA5fY87Q==Xdqiykrj7kB5zUD4'
                }
            });
            setNutrition(response.data.items);
        } catch (err) {
            console.error('Request failed:', err.response || err.message);
            setError('Could not fetch nutritional information');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Enter food name" 
                />
                <button type="submit">Get Nutrition</button>
            </form>
            {error && <p>{error}</p>}
            {nutrition && (
                <div>
                    <h2>Nutrition Information</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Food</th>
                                <th>Calories</th>
                                <th>Serving Size</th>
                                <th>Total Fat (g)</th>
                                <th>Saturated Fat (g)</th>
                                <th>Cholesterol (mg)</th>
                                <th>Sodium (mg)</th>
                                <th>Carbohydrates (g)</th>
                                <th>Fiber (g)</th>
                                <th>Sugar (g)</th>
                                <th>Protein (g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutrition.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.calories}</td>
                                    <td>{item.serving_size_g} g</td>
                                    <td>{item.fat_total_g}</td>
                                    <td>{item.fat_saturated_g}</td>
                                    <td>{item.cholesterol_mg}</td>
                                    <td>{item.sodium_mg}</td>
                                    <td>{item.carbohydrates_total_g}</td>
                                    <td>{item.fiber_g}</td>
                                    <td>{item.sugar_g}</td>
                                    <td>{item.protein_g}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default NutritionForm;
