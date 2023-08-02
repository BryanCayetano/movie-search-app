import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';

const API_KEY = '4287ad07'; // Reemplaza 'TU_API_KEY' con tu API Key de OMDb

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Función para realizar la búsqueda de películas
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
            setMovies(response.data.Search || []);
            setIsSearching(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsSearching(false);
        }
    };

    // Hook useEffect para implementar debounce en la búsqueda
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (isSearching) {
                handleSearch();
            }
        }, 500); // Tiempo de espera (debounce) de 500 milisegundos

        // Limpiamos el setTimeout en cada renderizado del componente para evitar ejecuciones duplicadas
        return () => clearTimeout(delayDebounceFn);
    }, [isSearching]);

    // Función para manejar el cambio en el campo de búsqueda
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setIsSearching(true); // Activamos el flag de búsqueda para realizarla automáticamente al escribir
    };

    return (
        <div>
            <TextField
                label="Buscar película"
                value={searchTerm}
                onChange={handleChange} // Cambiamos el evento onClick por onChange para que se ejecute al escribir
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Buscar
            </Button>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    {movie.Title}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Año: {movie.Year}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default MovieSearch;
