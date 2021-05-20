import React, { useState } from 'react'
import './HealthScore.component.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const green = "#06D6A0"
const orange = "#FF9E00"
const red = "#E63946"
const grey = "#999"
const ink = "#1D3557"


const stylesRed = buildStyles(
    {
        textColor: ink,
        pathColor: red,
        trailColor: grey
    }
)

const stylesOrange = buildStyles(
    {
        textColor: ink,
        pathColor: orange,
        trailColor: grey
    }
)

const stylesGreen = buildStyles(
    {
        textColor: ink,
        pathColor: green,
        trailColor: grey
    }
)



export default function HealthScore(props) {
    const [progress, setProgress] = useState()
    const percentage = props.healthScore;
    return (
        <div className="health-score">
            <CircularProgressbar 
            value={percentage} 
            text={`${percentage}%`} 
            strokeWidth={10} 
            styles={
                percentage > 80 ? stylesGreen
                : percentage < 55 ? stylesRed
                : stylesOrange
            }
            />
            <p className="title">Health Score</p>
        </div>
    )
}
