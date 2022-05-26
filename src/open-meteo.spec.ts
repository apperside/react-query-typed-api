export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  elevation: number
  generationtime_ms: number
  utc_offset_seconds: number
  hourly: Hourly
  hourly_units: HourlyUnits
  current_weather: CurrentWeather
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
}

export interface HourlyUnits {
  temperature_2m: string
}

export interface CurrentWeather {
  time: string
  temperature: number
  weathercode: number
  windspeed: number
  winddirection: number
}
