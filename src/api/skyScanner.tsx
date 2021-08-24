import axios from 'axios'

export const skyScanner = axios.create({
  baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices',
  headers: {
    'x-rapidapi-key': '443f55c22amsh3acc87da5f42897p1b86f4jsnd095602b6dff'
  }
})