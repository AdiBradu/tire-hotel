import React from 'react'
import AutoPlate from '../../components/AutoPlate/AutoPlate.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Table from '../../components/Table/Table.component'
import './VehicleDetails.component.scss'
import './VehicleDetails.component.scss'
import {ScaleLoader} from 'react-spinners'
import ReactPaginate from "react-paginate"

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`;
export default function VehicleDetailsFleet(props) {
  const tblTiresHeaderKeys = ["Nr. Crt.", "Pozitionare", "Dimensiuni", "Ind. viteza si sarcina", "Sezon", "Brand", "Model", "Tip auto", "DOT", "Uzura", "Actiuni"]
  const tblHotelTiresHeaderKeys = ["Nr. Crt.", "Pozitionare", "Dimensiuni", "Ind. viteza si sarcina", "Sezon", "Brand", "Model", "Tip auto", "DOT", "Uzura"]
  const tblServicesHeaderKeys = ["Nr. Crt.", "Data", "KM", "Cost"]
  const tirePositions = ["fata/dreapta","fata/stanga","spate/dreapta","spate/stanga","spate/exterior/dreapta","spate/exterior/stanga"]
  const actionsArr = [
    {
      iconIndex: 1,
      name: "edit",
      actionHandler: props.editActionHandler
    }
  ]
  let tiresDisplayData = []
  if(props.vehicleTires) {
    for (const [i, el] of props.vehicleTires.entries()) { 
      let tireRow = [el.t_id,tirePositions[i], el.width+"/"+el.height+"/"+el.diameter, el.speed_index+" "+el.load_index, el.tire_season, el.brand, el.tire_model, el.vehicle_type, el.tire_dot, el.tire_tread_wear.toFixed(2)]
      tiresDisplayData.push(tireRow)
    }
  }
  let hotelTiresDisplayData = []
  if(props.vehicleHotelTires) {
    for (const [i, el] of props.vehicleHotelTires.entries()) { 
      let tireRow = [el.t_id,tirePositions[i], el.width+"/"+el.height+"/"+el.diameter, el.speed_index+" "+el.load_index, el.tire_season, el.brand, el.tire_model, el.vehicle_type, el.tire_dot, el.tire_tread_wear.toFixed(2)]
      hotelTiresDisplayData.push(tireRow)
    }  
  }
  let today = new Date();
  let d = today.getDate();
  let m = today.getMonth()+1; 
  let y = today.getFullYear();

  let ordersDisplayData = []
  if(props.orders && props.orders.length > 0) {
    for (const [i, el] of props.orders.entries()) { 
      let sRow = [el.so_id,d+"/"+m+"/"+y,el.vehicle_mileage,parseFloat(el.order_total.toFixed(2))]
      ordersDisplayData.push(sRow)
    }
  }
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Fisa auto"
          showSearchBar={false}
        />    
        <AutoPlate 
          reg_number={props.reg_number}
          vehicle_type={props.vehicle_type}
          vehicle_tire_count={props.vehicle_tire_count}
        />
        <SectionSubTitle
          text={"Anvelope montate pe masina"}
        /> 
        <Table
          tblHeader={tblTiresHeaderKeys}
          tblBody={tiresDisplayData}
          tableMainClass={"table-vehicle-dets"}
          tableSecondaryClass={"table-vehicle-dets-layout"}
          renderArr={[1,2,3,4,5,6,7,8,9]}
          actionsArr={actionsArr}
        />  
        { hotelTiresDisplayData.length 
          ?
          <>
          <SectionSubTitle
            text={`Anvelope depozitate in hotel: ${props.vehicleHotel}`}
          /> 
          <Table
            tblHeader={tblHotelTiresHeaderKeys}
            tblBody={hotelTiresDisplayData}
            tableMainClass={"table-vehicle-dets"}
            tableSecondaryClass={"table-vehicle-dets-layout"}
            renderArr={[1,2,3,4,5,6,7,8,9]}          
          />
          </>  
          :
          null
        }    
        <SectionSubTitle
          text={"Portofoliu comenzi"}
        /> 
        {!props.showSpinner && ordersDisplayData.length ? 
          <>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={props.pageCount}
            onPageChange={props.changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            pageRangeDisplayed={5}
            forcePage={props.pageNumber}
          />
          <Table
            tblHeader={tblServicesHeaderKeys}
            tblBody={ordersDisplayData}
            tableMainClass={"table-vehicle-admin-order-dets"}
            tableSecondaryClass={"table-vehicle-admin-order-dets-layout"}
            renderArr={[1,2,3]}
            linkTo={`/dashboard/comenzi/detalii`}
            pageNumber={props.pageNumber}
            itemsPerPage={props.itemsPerPage}
          />
          <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={props.pageCount}
              onPageChange={props.changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              pageRangeDisplayed={5}
              forcePage={props.pageNumber}
            />
          </>
          :         
          <ScaleLoader 
          css={override}
          height='50px'
          width='5px'
          color={"#457B9D"}
          loading={props.showSpinner}
          />
        }           
      </div>
    </div>
  )
}