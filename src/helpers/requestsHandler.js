import axios from 'axios';

const baseURL = 'http://35.225.182.234';

export default {
    stationsService: axios.create({
        baseURL: `${baseURL}/api/stations`,
        timeout: 5000
    }),
    busService: axios.create({
        baseURL: `${baseURL}/api/buses`,
        timeout: 5000
    }),
    arrivalsService: axios.create({
        baseURL: `${baseURL}/api/arrivals`,
        timeout: 5000
    })
};