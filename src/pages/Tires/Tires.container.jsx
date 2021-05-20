import React, { useState, useEffect } from "react"
import api from "../../utils/Api"
import { useParams } from "react-router-dom"
import Tires from "./Tires.component"
import { ScaleLoader } from "react-spinners"
import Navigation from "../../components/Navigation/Navigation.component"

const override = `
  width: 100%;
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function TiresContainer() {
	const [loading, setLoading] = useState(true)
	const [fleetData, setFleetData] = useState([])
	const [tiresWidthFilter, setTiresWidthFilter] = useState("")
	const [tiresWidthFilterValues, setTiresWidthFilterValues] = useState(null)
	const [tiresHeightFilter, setTiresHeightFilter] = useState("")
	const [tiresHeightFilterValues, setTiresHeightFilterValues] = useState(null)
	const [tiresDiameterFilter, setTiresDiameterFilter] = useState("")
	const [tiresDiameterFilterValues, setTiresDiameterFilterValues] = useState(null)
	const [tiresSeasonFilter, setTiresSeasonFilter] = useState("")
	const [tiresSeasonFilterValues, setTiresSeasonFilterValues] = useState(null)
	const [tiresBrandFilter, setTiresBrandFilter] = useState("")
	const [tiresBrandFilterValues, setTiresBrandFilterValues] = useState(null)
	const [tiresDotFilter, setTiresDotFilter] = useState("")
	const [tiresDotFilterValues, setTiresDotFilterValues] = useState(null)
	const [tiresTreadUsageFilter, setTiresTreadUsageFilter] = useState("")
	const [tiresTreadUsageFilterValues, setTiresTreadUsageFilterValues] = useState(null)
	const [vehicleTypeFilter, setVehicleTypeFilter] = useState("")
	const [tiresVehicleTypeFilterValues, setTiresVehicleTypeFilterValues] = useState(null)
	const [fleetTiresList, setFleetTiresList] = useState(null)
	const [fleetId, setFleetId] = useState(null)
	const { fId } = useParams()
	const [showSpinner, setShowSpinner] = useState(true)

	const loadSelfFleet = async () => {
		try {
			const response = await api.get(`/fleets/uid`);
			setFleetId(response?.data[0].fi_id);
			setFleetData(response?.data[0]);
			return response?.data[0].fi_id;
		} catch (error) {
			setFleetData([]);
		}
	}

	const loadFleet = async () => {
		try {
			const response = await api.get(`/fleets/id/${fId}`);
			setFleetData(response?.data[0]);
			return response?.data[0].fi_id
		} catch (error) {
			setFleetData([])
		}
	}

	const loadFleetTires = async (fleet_id) => {
		try {
			const response = await api.get(`/tires/getFleetTires`, {
				params: {
					fleet_id: fleet_id,
				},
			})
			setFleetTiresList(response.data);
			if (response?.data?.length) {
				let widths = []
				let heights = []
				let diameters = []
				let seasons = []
				let brands = []
				let vehicleTypes = []
				let treadUsages = []
				let dots = []
				response.data.forEach((el) => {
					if (widths.indexOf(el.width) === -1) widths.push(el.width)
					if (heights.indexOf(el.height) === -1) heights.push(el.height)
					if (diameters.indexOf(el.diameter) === -1) diameters.push(el.diameter)
					if (seasons.indexOf(el.tire_season) === -1) seasons.push(el.tire_season)
					if (brands.indexOf(el.brand) === -1) brands.push(el.brand)
					if (vehicleTypes.indexOf(el.vehicle_type) === -1) vehicleTypes.push(el.vehicle_type)
					if (treadUsages.indexOf(el.tread_wear) === -1) treadUsages.push(el.tread_wear)
					if (dots.indexOf(el.tire_dot) === -1) dots.push(el.tire_dot)
				})
				setTiresWidthFilterValues(widths)
				setTiresHeightFilterValues(heights)
				setTiresDiameterFilterValues(diameters)
				setTiresSeasonFilterValues(seasons)
				setTiresBrandFilterValues(brands)
				setTiresVehicleTypeFilterValues(vehicleTypes)
				setTiresTreadUsageFilterValues(treadUsages)
				setTiresDotFilterValues(dots)
			}
			setShowSpinner(false);
		} catch (error) {
			setFleetTiresList([]);
			setShowSpinner(false);
		}
	}

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (fId) {
				loadFleet().then((res) => {
					setLoading(false)
					setFleetId(res)
					loadFleetTires(res)
				});
			} else {
				loadSelfFleet().then((res) => {
					setLoading(false)
					loadFleetTires(res)
				})
			}
		}
		return () => (mounted = false);
	}, [])

	const handleVehicleTypeFilterChange = (newFilter) => {
		setVehicleTypeFilter(newFilter)
	}
	const handleWidthFilterChange = (newFilter) => {
		setTiresWidthFilter(newFilter)
	}
	const handleHeightFilterChange = (newFilter) => {
		setTiresHeightFilter(newFilter)
	}
	const handleDiameterFilterChange = (newFilter) => {
		setTiresDiameterFilter(newFilter)
	}
	const handleBrandFilterChange = (newFilter) => {
		setTiresBrandFilter(newFilter)
	}
	const handleDotFilterChange = (newFilter) => {
		setTiresDotFilter(newFilter)
	}
	const handleSeasonFilterChange = (newFilter) => {
		setTiresSeasonFilter(newFilter)
	}
	const handleTreadUsageFilterChange = (newFilter) => {
		setTiresTreadUsageFilter(newFilter)
	}

	return !loading ? (
		<Tires
			fleetData={fleetData}
			fleetTiresList={fleetTiresList}
			tiresWidthFilter={tiresWidthFilter}
			handleWidthFilterChange={handleWidthFilterChange}
			tiresWidthFilterValues={tiresWidthFilterValues}
			tiresHeightFilter={tiresHeightFilter}
			handleHeightFilterChange={handleHeightFilterChange}
			tiresHeightFilterValues={tiresHeightFilterValues}
			tiresDiameterFilter={tiresDiameterFilter}
			handleDiameterFilterChange={handleDiameterFilterChange}
			tiresDiameterFilterValues={tiresDiameterFilterValues}
			tiresBrandFilter={tiresBrandFilter}
			handleBrandFilterChange={handleBrandFilterChange}
			tiresBrandFilterValues={tiresBrandFilterValues}
			tiresDotFilter={tiresDotFilter}
			handleDotFilterChange={handleDotFilterChange}
			tiresDotFilterValues={tiresDotFilterValues}
			tiresSeasonFilter={tiresSeasonFilter}
			handleSeasonFilterChange={handleSeasonFilterChange}
			tiresSeasonFilterValues={tiresSeasonFilterValues}
			tiresTreadUsageFilter={tiresTreadUsageFilter}
			handleTreadUsageFilterChange={handleTreadUsageFilterChange}
			tiresTreadUsageFilterValues={tiresTreadUsageFilterValues}
			vehicleTypeFilter={vehicleTypeFilter}
			handleVehicleTypeFilterChange={handleVehicleTypeFilterChange}
			tiresVehicleTypeFilterValues={tiresVehicleTypeFilterValues}
			showSpinner={showSpinner}
		/>
	) : (
		<div className="dashboard">
			<Navigation />
			<div className="workspace">
				<ScaleLoader
					css={override}
					height="50px"
					width="5px"
					color={"#457B9D"}
					loading={loading}
				/>
			</div>
		</div>
	)
}
