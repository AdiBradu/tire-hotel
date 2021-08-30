import React, { useState, useEffect } from "react"
import api from "../../utils/Api"
import { useParams } from "react-router-dom"
import Tires from "./Tires.component"
import { ScaleLoader } from "react-spinners"
import Navigation from "../../components/Navigation/Navigation.component"
import fileSaver from 'file-saver'

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
  const [tiresTreadUsageMmFilterValues, setTiresTreadUsageMmFilterValues] = useState(null)
  const [tiresTreadUsageMmFilter, setTiresTreadUsageMmFilter] = useState("")
	const [vehicleTypeFilter, setVehicleTypeFilter] = useState("")
	const [tiresVehicleTypeFilterValues, setTiresVehicleTypeFilterValues] = useState(null)
	const [fleetTiresList, setFleetTiresList] = useState(null)
	const [fleetId, setFleetId] = useState(null)
	const { fId } = useParams()
	const [showSpinner, setShowSpinner] = useState(true)
  const [totalTires, setTotalTires] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 50
  const [pageCount, setPageCount] = useState(0)

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
  const getExportData = () => {
    if(!showSpinner){
      setShowSpinner(true)
      api.get(`/tires/tiresToExcel`, {
        responseType: 'arraybuffer',
        params: {
          fleet_id: fleetId,
          totalTires: totalTires,
          vehicleTypeFilter: vehicleTypeFilter,
          tiresWidthFilter: tiresWidthFilter,
          tiresHeightFilter: tiresHeightFilter,
          tiresDiameterFilter: tiresDiameterFilter,
          tiresBrandFilter: tiresBrandFilter,
          tiresDotFilter: tiresDotFilter,
          tiresSeasonFilter: tiresSeasonFilter,
          tiresTreadUsageFilter: tiresTreadUsageFilter,
          tiresTreadUsageMmFilter: tiresTreadUsageMmFilter
        }
      }).then(res => {
        setShowSpinner(false)  
        var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fileSaver.saveAs(blob, fleetData.fleet_name + '.xlsx')
      }).catch(err => {
        setShowSpinner(false)  
      })         
    }
  }
  const loadFleetTiresFilters = async fleet_id => {
    try {
			const response = await api.get(`/tires/getFleetTiresFilters`, {
				params: {
					fleet_id: fleet_id          
				},
			})
			if (response?.data?.length) {
				let widths = []
				let heights = []
				let diameters = []
				let seasons = []
				let brands = []
				let vehicleTypes = []
				let treadUsages = []
        let treadUsagesMm = []
				let dots = []      
				response.data.forEach((el) => {
					if (widths.indexOf(el.width) === -1) widths.push(el.width)
					if (heights.indexOf(el.height) === -1) heights.push(el.height)
					if (diameters.indexOf(el.diameter) === -1) diameters.push(el.diameter)
					if (seasons.indexOf(el.tire_season) === -1) seasons.push(el.tire_season)
					if (brands.indexOf(el.brand) === -1) brands.push(el.brand)
					if (vehicleTypes.indexOf(el.vehicle_type) === -1) vehicleTypes.push(el.vehicle_type)
					if (treadUsages.indexOf(el.tread_wear) === -1) treadUsages.push(el.tread_wear)
          if (treadUsagesMm.indexOf(el.tire_tread_wear) === -1) treadUsagesMm.push(el.tire_tread_wear) 
					if (dots.indexOf(el.tire_dot) === -1) dots.push(el.tire_dot)
				})
				setTiresWidthFilterValues(widths.sort())
				setTiresHeightFilterValues(heights.sort())
				setTiresDiameterFilterValues(diameters.sort())
				setTiresSeasonFilterValues(seasons.sort())
				setTiresBrandFilterValues(brands.sort())
				setTiresVehicleTypeFilterValues(vehicleTypes.sort())
				setTiresTreadUsageFilterValues(treadUsages.sort())
        setTiresTreadUsageMmFilterValues(treadUsagesMm.sort())
				setTiresDotFilterValues(dots.sort())      
			}
			
		} catch (error) {			
		}  
  }
	const loadFleetTires = async (fleet_id, pageNo, itemLimit, vehicleTypeFilter, tiresWidthFilter, tiresHeightFilter, tiresDiameterFilter, tiresBrandFilter, tiresDotFilter, tiresSeasonFilter, tiresTreadUsageFilter, tiresTreadUsageMmFilter) => {
		try {
			const response = await api.get(`/tires/getFleetTires`, {
				params: {
					fleet_id: fleet_id,
          page: pageNo,
          limit: itemLimit,
          vehicleTypeFilter: vehicleTypeFilter,
          tiresWidthFilter: tiresWidthFilter,
          tiresHeightFilter: tiresHeightFilter,
          tiresDiameterFilter: tiresDiameterFilter,
          tiresBrandFilter: tiresBrandFilter,
          tiresDotFilter: tiresDotFilter,
          tiresSeasonFilter: tiresSeasonFilter,
          tiresTreadUsageFilter: tiresTreadUsageFilter,
          tiresTreadUsageMmFilter: tiresTreadUsageMmFilter
				},
			})
      let fleetTiresList = []
			
			if (response?.data?.fleetTiresList?.length) {			
				response.data.fleetTiresList.forEach((el) => {			
          fleetTiresList.push({t_id: el.t_id, width: el.width, height: el.height, diameter: el.diameter, speed_index: el.speed_index, load_index: el.load_index, tire_season: el.tire_season, brand: el.brand, vehicle_type: el.vehicle_type, tread_wear: el.tread_wear, tire_tread_wear: el.tire_tread_wear.toFixed(2), tire_dot: el.tire_dot})
				})		
        setFleetTiresList(fleetTiresList)
        setTotalTires(response.data.tireCount)
        setPageCount(Math.ceil(response.data.tireCount / itemsPerPage))
			} else {
        setFleetTiresList(null)
        setTotalTires(0)
        setPageCount(0)
      }
			setShowSpinner(false)
		} catch (error) {
			setFleetTiresList([]);
			setShowSpinner(false);
		}
	}

	useEffect(() => {
		let mounted = true;
		if (mounted) {
      if(!fleetTiresList) {
        if (fId) {
          loadFleet().then((res) => {
           
            
            ( async () => {
                await loadFleetTiresFilters(res)
                await loadFleetTires(res, pageNumber, itemsPerPage, vehicleTypeFilter, tiresWidthFilter, tiresHeightFilter, tiresDiameterFilter, tiresBrandFilter, tiresDotFilter, tiresSeasonFilter, tiresTreadUsageFilter, tiresTreadUsageMmFilter)
              }
            )()
            setFleetId(res)
            setLoading(false)
          });
        } else {
          loadSelfFleet().then((res) => {
            setLoading(false)
            ( async () => {
                await loadFleetTiresFilters(res)
                await loadFleetTires(res, pageNumber, itemsPerPage, vehicleTypeFilter, tiresWidthFilter, tiresHeightFilter, tiresDiameterFilter, tiresBrandFilter, tiresDotFilter, tiresSeasonFilter, tiresTreadUsageFilter, tiresTreadUsageMmFilter)
              }
            )()
          })
        }
      } else {
        
        (async () => {
          setShowSpinner(true)
          await loadFleetTires(fleetId, pageNumber, itemsPerPage, vehicleTypeFilter, tiresWidthFilter, tiresHeightFilter, tiresDiameterFilter, tiresBrandFilter, tiresDotFilter, tiresSeasonFilter, tiresTreadUsageFilter, tiresTreadUsageMmFilter)
        })()
      }
		}
		return () => (mounted = false);
	}, [pageNumber, vehicleTypeFilter, tiresWidthFilter, tiresHeightFilter, tiresDiameterFilter, tiresBrandFilter, tiresDotFilter, tiresSeasonFilter, tiresTreadUsageFilter, tiresTreadUsageMmFilter])

	const handleVehicleTypeFilterChange = (newFilter) => {
		setVehicleTypeFilter(newFilter)
	}
	const handleWidthFilterChange = (newFilter) => {
    setPageNumber(0)
		setTiresWidthFilter(newFilter)
	}
	const handleHeightFilterChange = (newFilter) => {
    setPageNumber(0)
		setTiresHeightFilter(newFilter)
	}
	const handleDiameterFilterChange = (newFilter) => {
    setPageNumber(0)
		setTiresDiameterFilter(newFilter)
	}
	const handleBrandFilterChange = (newFilter) => {
    setPageNumber(0)
		setTiresBrandFilter(newFilter)
	}
	const handleDotFilterChange = (newFilter) => {
    setPageNumber(0)
		setTiresDotFilter(newFilter)
	}
	const handleSeasonFilterChange = (newFilter) => {
    setPageNumber(0)
		setTiresSeasonFilter(newFilter)
	}
	const handleTreadUsageFilterChange = (newFilter) => {
    setPageNumber(0)
		setTiresTreadUsageFilter(newFilter)
	}

  const handleTreadUsageMmFilterChange = (newFilter) => {
    setPageNumber(0)
		setTiresTreadUsageMmFilter(newFilter)
	}

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
      tiresTreadUsageMmFilter={tiresTreadUsageMmFilter}
      handleTreadUsageMmFilterChange={handleTreadUsageMmFilterChange}
      tiresTreadUsageMmFilterValues={tiresTreadUsageMmFilterValues}
			showSpinner={showSpinner}
      pageCount={pageCount}
      changePage={changePage}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      getExportData={getExportData}    
      totalTires={totalTires} 
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
