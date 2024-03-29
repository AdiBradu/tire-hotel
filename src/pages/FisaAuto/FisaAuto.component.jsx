import React from 'react'
import { Link } from 'react-router-dom'
import AutoPlate from '../../components/AutoPlate/AutoPlate.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Table from '../../components/Table/Table.component'
import './FisaAuto.component.scss'
import AddButton from '../../components/PrimaryButton/PrimaryButton.component'
import AddLogo from '../../assets/add.png'
import Alert from '../../components/Alert/Alert.component'
import jsPDF from "jspdf"
import "jspdf-autotable"
import { logoBase64 } from '../../utils/LogoBase64'

export default function FisaAuto(props) {
  const tblTiresHeaderKeys = ["Nr. Crt.", "Pozitionare", "Dimensiuni", "Ind. viteza si sarcina", "Sezon", "Brand", "Model", "Tip auto", "DOT", "Uzura"]
  const tblServicesHeaderKeys = ["Nr. Crt.", "Data", "Tip serviciu", "Actiuni"]
  const tirePositions = ["fata/dreapta","fata/stanga","spate/dreapta","spate/stanga","spate/exterior/dreapta","spate/exterior/stanga"]
  const actionsArr = [
    {
      iconIndex: 0,
      name: "delete",
      actionHandler: props.deleteActionHandler
    }
  ]
  let tiresDisplayData = []
  if(props.vehicleTires) {
    for (const [i, el] of props.vehicleTires.entries()) { 
      let tireRow = [el.t_id,tirePositions[i], el.width+"/"+el.height+"/"+el.diameter, el.speed_index+" "+el.load_index, el.tire_season, el.brand, el.tire_model, el.vehicle_type, el.tire_dot, el.tire_tread_wear]
      tiresDisplayData.push(tireRow)
    }
  }
  let tiresHotelDisplayData = []
  if(props.vehicleHotelTires) {
    for (const [i, el] of props.vehicleHotelTires.entries()) { 
      let tireHRow = [el.t_id,tirePositions[i], el.width+"/"+el.height+"/"+el.diameter, el.speed_index+" "+el.load_index, el.tire_season, el.brand, el.tire_model, el.vehicle_type, el.tire_dot, el.tire_tread_wear]
      tiresHotelDisplayData.push(tireHRow)
    }
  }
  
  let today = new Date();
  let d = today.getDate();
  let m = today.getMonth()+1; 
  let y = today.getFullYear();

  let servicesDisplayData = []
  if(props.selectedServices) {
    for (const [i, el] of props.selectedServices.entries()) { 
      let sRow = [el.s_id,d+"/"+m+"/"+y,el.service_name]
      servicesDisplayData.push(sRow)
    }
  }
 
  const generatePdf = () => {
    let dateStr = d+"/"+m+"/"+y
    let nrCrt = 1
    let printableServicesList = []
    let printableServicesHeader = ["Nr. Crt.", "Data", "Tip serviciu"]
    let printableTiresHeader = ["Pozitionare", "Dimensiuni", "Indici", "Sezon", "Brand", "Model", "Tip Auto", "DOT", "Uzura"]
    let printableCurrentTires = []
    let isHotelStorage = false
    const doc = new jsPDF()
    doc.setFont("helvetica","normal","normal")
    doc.setFontSize(9)
    doc.text(147, 10, 'Fisa nr. ...... din data de '+d+"/"+m+"/"+y)
    //doc.text('LOGO AICI', 15, 10)   
    doc.addImage(logoBase64,'JPEG',15,1,23,23,'LOGO','FAST',0)
    doc.setFontSize(14)
    doc.text(84, 20, 'FISA SERVICE')    
    
    doc.setFontSize(9)
    doc.text(15, 30, 'DATE VEHICUL:')
    doc.autoTable(["Nr. inmatriculare", "Marca", "Nr. Km.", "Client"], [[props.reg_number, props.vData.vehicle_brand, props.updatedMilage, props.vData.fleet_name]], { theme: 'grid', headStyles: {halign: 'center',fillColor: [0, 0, 0], fontSize: 8 }, columnStyles: { 0: { halign: 'center', fontSize: 8}, 1: { halign: 'center', fontSize: 8}, 2: { halign: 'center', fontSize: 8}, 3: { halign: 'center', fontSize: 8}}, startY: 32 });

    
    let tiresTextHeight = 50;
    doc.text('ANVELOPE MONTATE:',15,parseInt(tiresTextHeight))
    for (const [i, el] of tiresDisplayData.entries()) { 
      let newPrintableCurrentT = [el[1], el[2], el[3], el[4], el[5], el[6], el[7], el[8], parseFloat(el[9].toFixed(1))]
      printableCurrentTires.push(newPrintableCurrentT)
    }
    doc.autoTable(printableTiresHeader, printableCurrentTires, { theme: 'grid', headStyles: {halign: 'center',fillColor: [0, 0, 0], fontSize: 8 }, columnStyles: { 0: { halign: 'center', fontSize: 8}, 1: { halign: 'center', fontSize: 8}, 2: { halign: 'center', fontSize: 8}, 3: { halign: 'center', fontSize: 8}, 4: { halign: 'center', fontSize: 8}, 5: { halign: 'center', fontSize: 8}, 6: { halign: 'center', fontSize: 8}, 7: { halign: 'center', fontSize: 8}, 8: { halign: 'center', fontSize: 8}}, startY: parseInt(tiresTextHeight+2) });

    for (const [i, el] of props.selectedServices.entries()) { 
      if(el.s_id !== 'km_upd' && el.s_id !== 'tire_upd') {
        let inList = printableServicesList.filter(e => e[2] === el.service_name)
        if(!inList.length) {
          let newPrintableS = [nrCrt,dateStr,el.service_name]
          printableServicesList.push(newPrintableS)
          nrCrt++
        }

        let availableServices = JSON.parse(sessionStorage.getItem('availableServices'))
        let srvcInfo = availableServices.filter(s => parseInt(s.sl_id) === parseInt(el.s_id))
        if(parseInt(srvcInfo[0].hotel_service) !== 0) {
          isHotelStorage = true
        }
      }
            
    }

    
    let oldTiresTextHeight = parseInt(props.vehicle_tire_count) > 4 ? tiresTextHeight + 54 : tiresTextHeight + 42;
    doc.text('ANVELOPE DEMONTATE:',15,parseInt(oldTiresTextHeight))
    let vHotelTires = JSON.parse(sessionStorage.getItem('vehicleHotelTires'))
    let oldVTires = isHotelStorage || !vHotelTires.length ? JSON.parse(sessionStorage.getItem('oldVehicleTires')) : JSON.parse(sessionStorage.getItem('vehicleHotelTires'))
    let printableOldTires = []
    for (const [i, el] of oldVTires.entries()) { 
      let oldPrintableT = [tirePositions[i], el.width+"/"+el.height+"/"+el.diameter, el.speed_index+" "+el.load_index, el.tire_season, el.brand, el.tire_model, el.vehicle_type, el.tire_dot, parseFloat(el.tire_tread_wear.toFixed(1))]
      printableOldTires.push(oldPrintableT)
    }
    
    doc.autoTable(printableTiresHeader, printableOldTires, { theme: 'grid', headStyles: {halign: 'center',fillColor: [0, 0, 0], fontSize: 8 }, columnStyles: { 0: { halign: 'center', fontSize: 8}, 1: { halign: 'center', fontSize: 8}, 2: { halign: 'center', fontSize: 8}, 3: { halign: 'center', fontSize: 8}, 4: { halign: 'center', fontSize: 8}, 5: { halign: 'center', fontSize: 8}, 6: { halign: 'center', fontSize: 8}, 7: { halign: 'center', fontSize: 8}, 8: { halign: 'center', fontSize: 8}}, startY: parseInt(oldTiresTextHeight+2) });

    doc.text('OPERATIUNI:',15,(parseInt(props.vehicle_tire_count) > 4 ? 158 : 138))    
    doc.autoTable(printableServicesHeader, printableServicesList, { theme: 'grid', headStyles: {halign: 'center',fillColor: [0, 0, 0], fontSize: 8 }, columnStyles: { 0: { halign: 'center', fontSize: 8}, 1: { halign: 'center', fontSize: 8}, 2: { halign: 'center', fontSize: 8} }, startY: (parseInt(props.vehicle_tire_count) > 4 ? 160 : 140)});
    
    let obsTextHeight = parseInt(props.vehicle_tire_count) > 4 ? oldTiresTextHeight + 120 : oldTiresTextHeight + 130;
    doc.setFontSize(9)
    doc.text('ALTE OBSERVATII:',15,parseInt(obsTextHeight))
    doc.line(15,parseInt(obsTextHeight+5), 197, parseInt(obsTextHeight+5))
    doc.line(15,parseInt(obsTextHeight+10), 197, parseInt(obsTextHeight+10))
    /* doc.line(15,parseInt(obsTextHeight+21), 197, parseInt(obsTextHeight+21)) */

    doc.text('REPREZENTANT HOTELULDEROTI.RO', 15, parseInt(obsTextHeight+20))
    doc.text('REPREZENTANT CLIENT', 136, parseInt(obsTextHeight+20))
    doc.text('NUME ____________________________', 15, parseInt(obsTextHeight+25))
    doc.text('NUME ____________________________', 136, parseInt(obsTextHeight+25))
    doc.text('SEMNATURA _______________________', 15, parseInt(obsTextHeight+30))
    doc.text('SEMNATURA _______________________', 136, parseInt(obsTextHeight+30))

    doc.setFontSize(5)
    
    var splitFooterText = doc.splitTextToSize(`Deviz numar:\nNumar bon depozitare:\nRotile au fost stranse cu cheia dinamometrica la cuplul de strangere de referinta. Clientul a asistat la manopera si a certificate-o prin semnatura.\nPiesele de schimb inlocuite in procesul de reparative s-au returnat clientului\nSemnatura:………………………….\nAcord: Prin semnarea acestui document declar ca imi exprim consimtamantul pentru ca orice date cu caracter personal, precum orice alte informatii furnizate catre mine, cuprinse in acest document, sa intre in baza de date WWW.HOTELULDEROTI.RO , pentru a fi prelucrate si utilizate in scop de gestiune economico-financiara, administrative, marketing si publicitate. Pe baza unei cereri scrise, imi pot exercita urmatoarele drepturi, conform Legii nr.677/2001: de acces, o data pe an, la prelucrarea datelor mele personale; de interventie asupra datelor transmise; de a nu fi supus unei decizii individuale; de a ma opune prelucrarii datelor personale care ma privesc, de a solicita stergerea datelor si dreptul de a ma adresa justitiei. Clientul este de accord ca in situatia in care, dupa indeplinirea unui termen de 12 luni de la data depozitatii rotilor/anvelopelor nu a revendicate si nici nu a efectuat plata sericiului de depozitare pentru aceste produse. Vanzatorul sa le considere ca fiind abandonate sis a dispuna liber de ele fara notificare prealabila a clientului.\nConditii de acordare a garantiei: Conform Legii 449/2003 se acorda garantie de 3 luni pentru manopera si pentru produsele furnizate de unitatea noastra conform certificatelor de garantie emise de furnizori. Nu se acorda garantie pentru produsele furnizate de client si montate in unitatea nostra, raspunderea pentru calitatea acestoara revine clientilor. ATENTIE: Garantia nu se acorda in situatia exploatarii produselor si sau vehicolului fara respectarea prescriptiilor producatorului/constructorului precum si in situatiile prevazute de legislatia in domeniu. La solicitarea scrisa a beneficiarului unitatea va asigura vizibilitatea activitatilor desfasurate si inregistrarilor care sa dovedeasca efectuarea inspectiilor finale. Orice reclamatie trebuie insotita de prezentarea de celelate documente primate la receptia lucrarii. Reclamatiile se primesc la sediul principal WWW.Hotelulderoti.ro`, 190);
    doc.text(splitFooterText, 15, parseInt(obsTextHeight+44));
    
    doc.save(`Fisa_service_${props.reg_number}_${dateStr}.pdf`);
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
          tableMainClass={"table-services-tires"}
          tableSecondaryClass={"table-services-tires-layout"}
          renderArr={[1,2,3,4,5,6,7,8,9]}
        />
        {tiresHotelDisplayData.length ?
        <>
        <SectionSubTitle
          text={"Anvelope depozitate"}
        /> 
        <Table
          tblHeader={tblTiresHeaderKeys}
          tblBody={tiresHotelDisplayData}
          tableMainClass={"table-services-tires"}
          tableSecondaryClass={"table-services-tires-layout"}
          renderArr={[1,2,3,4,5,6,7,8,9]}
        />
        </>
        :
        null  
        }
        <Link to="/dashboard/adauga/serviciu">
          <AddButton text={'ADAUGA SERVICIU'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} img={AddLogo}/>
        </Link>
        <SectionSubTitle
          text={"Servicii operate"}
        /> 
        <Table
          tblHeader={tblServicesHeaderKeys}
          tblBody={servicesDisplayData}
          tableMainClass={"table-services"}
          tableSecondaryClass={"table-services-layout"}
          actionsArr={actionsArr}
          renderArr={[1,2,3]}
        />
        {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
        {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
        <div className="service-action-btns-holder">
          <AddButton 
            text={'FINALIZEAZA'}
            bgcolor={'rgb(255, 158, 0)'}
            color={'white'} 
            weight={'600'}
            onClick={props.completeOrder}
            btnDisabled={props.disableSubmitBtn}
          />
          <AddButton 
            text={'PRINT'}
            bgcolor={'#457B9D'}
            color={'white'} 
            weight={'600'}
            onClick={generatePdf}
            btnDisabled={props.disableSubmitBtn}         
          />
        </div>
      </div>
    </div>
  )
}
