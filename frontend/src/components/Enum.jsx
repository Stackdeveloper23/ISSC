import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Config from '../Config';

const Enum = ({ value, onChange, field }) => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await Config.getEnum(field);
                console.log('Respuesta de la API:', response.data); // Registro de la respuesta de la API

                // Verifica si la respuesta es un array y establece las opciones
                if (Array.isArray(response.data)) {
                    setOptions(response.data);
                } else {
                    console.error('La respuesta de la API no es un array:', response.data);
                    setOptions([]); // Asegúrate de que options sea un array
                }
            } catch (error) {
                console.error('Hubo un error al obtener las opciones del enum:', error);
                setOptions([]); // En caso de error, asegúrate de que options sea un array
            }
        };

        fetchOptions();
    }, [field]);

    return (
        <select value={value} onChange={onChange} className="form-select">
            <option value="">Select an option</option>
            {options.map((option, idx) => (
                <option key={idx} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Enum;
