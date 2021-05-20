import React from 'react'
import './FleetStats.component.scss'
import Segment from '../Segment/Segment.component'
import Wear from '../Wear/Wear.component'
import TurismLogo from '../../assets/turism.png'
import SuvLogo from '../../assets/suv.png'
import CargoLogo from '../../assets/cargo.png'
import LowLogo from '../../assets/low.png'
import MediumLogo from '../../assets/medium.png'
import HighLogo from '../../assets/high.png'
import HealthScore from '../../components/HealthScore/HealthScore.component'

export default function FleetStats(props) {
    const totalTires = props.excessiveUsageTires + props.mediumUsageTires + props.noUsageTires
    const computedHealthScore = totalTires !== 0 ? Math.ceil((props.excessiveUsageTires * 1 + props.mediumUsageTires * 2 + props.noUsageTires * 3) / (totalTires * 3)*100) : 0
    return (
        <div className="fleet-stats">
            <Segment color={"#06D6A0"} segment={"turism"} auto={props.fleetTurismCount} anvelope={props.fleetTurismTireCount} dimensiuni={props.fleetTurismSizesCount} img={TurismLogo}/>
            <Segment color={"#FF9E00"} segment={"suv"} auto={props.fleetSuvCount} anvelope={props.fleetSuvTireCount} dimensiuni={props.fleetSuvSizesCount} img={SuvLogo}/>
            <Segment color={"#E63946"} segment={"cargo"} auto={props.fleetCargoCount} anvelope={props.fleetCargoTireCount} dimensiuni={props.fleetCargoSizesCount} img={CargoLogo}/>
            <Wear color={"#1D3557"} text={"uzura excesiva"} img={LowLogo} data={props.excessiveUsageTires}/>
            <Wear color={"#1D3557"} text={"uzura medie"} img={MediumLogo} data={props.mediumUsageTires}/>
            <Wear color={"#1D3557"} text={"stare buna"} img={HighLogo} data={props.noUsageTires}/>
            <HealthScore healthScore={computedHealthScore} />
        </div>
    )
}
