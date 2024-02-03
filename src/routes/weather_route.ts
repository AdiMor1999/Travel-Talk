import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

const OPENWEATHERMAP_API_KEY: string = process.env.OPENWEATHERMAP_API_KEY || '';

interface WeatherResponse {
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
}

router.get('/:city', async (req: Request, res: Response) => {
    try {
      const { city } = req.params;
      const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
  
      const response = await axios.get<WeatherResponse>(url);
      const { main, weather } = response.data;
  
      res.json({
        temperature: main.temp,
        description: weather[0].description,
        icon: weather[0].icon,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching weather data:', error.message);
        res.status(500).json({ message: 'Error fetching weather data', details: error.message });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  });
  
  export default router;


