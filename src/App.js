import React, { useEffect, useState } from "react";
import "./App.css"

const CovidCard = ({countries, totalConfirmed}) => {
    return (
        <div className="covid-card">
        <p className="covid-text">{countries} total terkonfirmasi : {totalConfirmed}</p>
        </div>
    )
}

const NationList = ({list}) => {
    return (
        list.map((item) => {
            return <CovidCard 
            countries={item.countries} 
            totalConfirmed={item.totalConfirmed}
            />
        })
    )
}

const Header = () => {
    return (
        <h1 className="header">Covid data around world</h1>
    )
}

const CovidApp = () => {
    const [list, setlist] = useState([]);
    
    useEffect(() => {
        const url = "https://api.covid19api.com/summary";
        fetch(url).then(response => response.json()).then(result => {
            console.log(result);
            const countries = result.Countries;
            for (let i = 0; i < countries.length; i++) {
                if(i === 10) break;
                const newItem = {
                    countries: countries[i].Country,
                    totalConfirmed: countries[i].TotalConfirmed,
                }
                setlist(prevList => [...prevList, newItem])
            }
        });
    }, []);

    return (
        <div className="cover">
            <Header />
            <NationList list={list} />
        </div>
    )
}

const App = () => {
    return (
        <CovidApp />
    )
}

export default App;