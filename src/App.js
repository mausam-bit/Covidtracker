import React, { useEffect, useState } from 'react';
import './App.css'
import Line from './components/LineGraph';
import CovidSummery from './components/covidSummery'
import axios from './axios';

function App() {

    const [totalRecovered,setTotalRecovered] = useState(0);
    const [totalConfirmed,setTotalConfirmed] = useState(0);
    const [totalDeaths,setTotalDeaths] = useState(0);
    const [covidSummery,setCovidSummary] = useState({});
    const [country,setCountry] = useState('');
    const [days,setDays] = useState(7);
    const [coronaCountAr,setCoronaCountAr] = useState([]);
    const [label,setLabel] = useState([]);

    useEffect(()=>{
        axios.get(`/summary`)
        .then( res=> {
            if(res.status===200){
                setTotalConfirmed(res.data.Global.TotalConfirmed);
                setTotalRecovered(res.data.Global.TotalRecovered);
                setTotalDeaths(res.data.Global.TotalDeaths);
                setCovidSummary(res.data);
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    function fromateDate(date){
        const d=new Date(date);
        const year=d.getFullYear();
        const mon=`0${d.getMonth()+1}`.slice(-2);
        const day=d.getDate();

        return `${year}-${mon}-${day}`;

    }

    function countryHandler(e){
        setCountry(e.target.value);
        const d=new Date();
        const to=fromateDate(d);
        const from=fromateDate(d.setDate(d.getDate()-days));

        getCoronaReportByDateRange(e.target.value,from,to);
    }
    function daysHandler(event){
        setDays(event.target.value);
        const d=new Date();
        const to=fromateDate(d);
        const from=fromateDate(d.setDate(d.getDate()-event.target.value));

        getCoronaReportByDateRange(country,from,to);

    }

    function getCoronaReportByDateRange(country,from,to){
        axios(`/country/${country}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
        .then(res => {

            const covidDetils = covidSummery.Countries.find(c =>c.Slug===country);

            const yAxisCoronaCount = res.data.map(d => d.Cases);
            const xAxisLabel = res.data.map(d => d.Date);
            setCoronaCountAr(yAxisCoronaCount);
            setTotalConfirmed(covidDetils.TotalConfirmed);
            setTotalRecovered(covidDetils.TotalRecovered);
            setTotalDeaths(covidDetils.TotalDeaths);
            setLabel(xAxisLabel);
 

        })
        .catch(err => console.log(err))
    }
    return (
        <div className='App'>
            <CovidSummery 
                totalConfirmed={totalConfirmed}
                totalRecovered={totalRecovered}
                totalDeaths={totalDeaths}
                country={country}
            />
            <div>
                <select value={country} onChange={countryHandler}>
                    <option value="">Select Country</option>
                    {covidSummery.Countries && covidSummery.Countries.map(country => 
                        <option value={country.Slug}>{country.Country}</option>
                    )}
                </select>
                <select value={days} onChange={daysHandler}>
                        <option value='7'>Last 7 days</option>
                        <option value='30'>Last 30 days</option>
                        <option value='90'>Last 90 days</option>
                </select>
            </div>

            <Line 
                yAxis={coronaCountAr}
                label={label}
            />
        </div>
    );
}

export default App;