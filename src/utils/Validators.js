function capitalizeFirstLetter(string) {
  return (string.length ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : "");
}


export const validateVehicleBulkImport = (fileContents, tireOpts, fleetId) => {
  let err=null
  let vehiclesList=[]
  for (const [i, el] of fileContents.entries()) {      
    let tiresWidths = []        
    let tiresHeights = []
    let tiresDiameters = []
    let tiresSpeedIndexes = []
    let tiresLoadIndexes = []
    let tiresBrands = []
    let tiresModels = []
    let tiresSeasons = []
    let tiresDots = []
    let tiresRims = []
    let tiresTreadUsages = []
    
    if(i > 0 && el.length > 1){
      
      if(el[0] !== "4" && el[0] !== "6") {
        err = 'Eroare nr. anvelope linia ' + i; break;
      }
      if(el[1] === "") {
        err = 'Eroare nr. inmatriculare lipsa linia ' + i; break;
      }
      if(el[2] === "") {
        err = 'Eroare marca vehicul lipsa linia ' + i; break;
      }
      if(el[3] === "") {
        err = 'Eroare model vehicul lipsa linia ' + i; break;
      }
      if(el[4].toUpperCase() !== "TURISM" && el[4].toUpperCase() !== "SUV" && el[4].toUpperCase() !== "CARGO") {
        err = 'Eroare tip vehicul linia ' + i; break;
      }
      if(el[5] === "") {
        err = 'Eroare km vehicul lipsa linia ' + i; break;
      }
      /* 1st tire */
      let tireWidth1 = tireOpts.widthsList.filter(w => w.width === el[6])      
      if(tireWidth1.length < 1) {
        err = 'Eroare latime anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresWidths.push(tireWidth1[0].tw_id)  
      } 

      let tireHeight1 = tireOpts.heightsList.filter(h => h.height === el[7])
      if(tireHeight1.length < 1) {
        err = 'Eroare inaltime anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresHeights.push(tireHeight1[0].th_id)  
      }

      let tireDiameter1 = tireOpts.rimsList.filter(d => d.rim === el[8])
      if(tireDiameter1.length < 1) {
        err = 'Eroare diametru anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresDiameters.push(tireDiameter1[0].tr_id)  
      }

      let tireSpeedIndex1 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[9].toUpperCase())
      if(tireSpeedIndex1.length < 1) {
        err = 'Eroare ind. viteza anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresSpeedIndexes.push(tireSpeedIndex1[0].tsi_id)  
      }

      let tireLoadIndex1 = tireOpts.loadIndexesList.filter(li => li.load_index === el[10].toUpperCase())
      if(tireLoadIndex1.length < 1) {
        err = 'Eroare ind. sarcina anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresLoadIndexes.push(tireLoadIndex1[0].tli_id)  
      }

      let tireBrand1 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[11].toLowerCase())
      if(tireBrand1.length < 1) {       
        err = 'Eroare brand anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresBrands.push(tireBrand1[0].tb_id)  
      }
      
      if(el[12] === "") {
        err = 'Eroare model lipsa anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresModels.push(el[12])  
      }

      let tireSeason1 = capitalizeFirstLetter(el[13])      
      if(tireSeason1 === "" || (tireSeason1 !== 'Iarna' && tireSeason1 !== 'Vara' && tireSeason1 !== 'All season')) {
        err = 'Eroare sezon anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresSeasons.push(tireSeason1)  
      }
            
      if(el[14] === "") {
        err = 'Eroare DOT lipsa anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresDots.push(el[14])  
      }

      if(el[15] === "" || (el[15].toUpperCase() !== "DA" && el[15].toUpperCase() !== "NU")) {
        err = 'Eroare Janta anvelopa fata/dreapta linia ' + i; break;
      } else {
        let tireRim1 = (el[15].toUpperCase() === "DA" ? "1" : "2") 
        tiresRims.push(tireRim1)  
      }

      if(el[16] === "" || parseFloat(el[16].replace(",", ".")) < 0 || parseFloat(el[16].replace(",", ".")) > 12) {
        err = 'Eroare uzura anvelopa fata/dreapta linia ' + i; break;
      } else {
        let tireTreadUsage1 = el[16].replace(",", ".")
        tiresTreadUsages.push(tireTreadUsage1)  
      }

      /* 2nd tire */
      let tireWidth2 = tireOpts.widthsList.filter(w => w.width === el[17])      
      if(tireWidth2.length < 1) {
        err = 'Eroare latime anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresWidths.push(tireWidth2[0].tw_id)  
      } 

      let tireHeight2 = tireOpts.heightsList.filter(h => h.height === el[18])
      if(tireHeight2.length < 1) {
        err = 'Eroare inaltime anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresHeights.push(tireHeight2[0].th_id)  
      }

      let tireDiameter2 = tireOpts.rimsList.filter(d => d.rim === el[19])
      if(tireDiameter2.length < 1) {
        err = 'Eroare diametru anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresDiameters.push(tireDiameter2[0].tr_id)  
      }

      let tireSpeedIndex2 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[20].toUpperCase())
      if(tireSpeedIndex2.length < 1) {
        err = 'Eroare ind. viteza anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresSpeedIndexes.push(tireSpeedIndex2[0].tsi_id)  
      }

      let tireLoadIndex2 = tireOpts.loadIndexesList.filter(li => li.load_index === el[21].toUpperCase())
      if(tireLoadIndex2.length < 1) {
        err = 'Eroare ind. sarcina anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresLoadIndexes.push(tireLoadIndex2[0].tli_id)  
      }

      let tireBrand2 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[22].toLowerCase())
      if(tireBrand2.length < 1) {       
        err = 'Eroare brand anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresBrands.push(tireBrand2[0].tb_id)  
      }
      
      if(el[23] === "") {
        err = 'Eroare model lipsa anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresModels.push(el[23])  
      }

      let tireSeason2 = capitalizeFirstLetter(el[24])      
      if(tireSeason2 === "" || (tireSeason2 !== 'Iarna' && tireSeason2 !== 'Vara' && tireSeason2 !== 'All season')) {
        err = 'Eroare sezon anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresSeasons.push(tireSeason2)  
      }
            
      if(el[25] === "") {
        err = 'Eroare DOT lipsa anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresDots.push(el[25])  
      }

      if(el[26] === "" || (el[26].toUpperCase() !== "DA" && el[26].toUpperCase() !== "NU")) {
        err = 'Eroare Janta anvelopa fata/stanga linia ' + i; break;
      } else {
        let tireRim2 = (el[26].toUpperCase() === "DA" ? "1" : "2") 
        tiresRims.push(tireRim2)  
      }

      if(el[27] === "" || parseFloat(el[27].replace(",", ".")) < 0 || parseFloat(el[27].replace(",", ".")) > 12) {
        err = 'Eroare uzura anvelopa fata/stanga linia ' + i; break;
      } else {
        let tireTreadUsage2 = el[27].replace(",", ".")
        tiresTreadUsages.push(tireTreadUsage2)  
      }

      /* 3rd tire */
      let tireWidth3 = tireOpts.widthsList.filter(w => w.width === el[28])      
      if(tireWidth3.length < 1) {
        err = 'Eroare latime anvelopa spate/dreata linia ' + i; break;
      } else {
        tiresWidths.push(tireWidth3[0].tw_id)  
      } 

      let tireHeight3 = tireOpts.heightsList.filter(h => h.height === el[29])
      if(tireHeight3.length < 1) {
        err = 'Eroare inaltime anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresHeights.push(tireHeight3[0].th_id)  
      }

      let tireDiameter3 = tireOpts.rimsList.filter(d => d.rim === el[30])
      if(tireDiameter3.length < 1) {
        err = 'Eroare diametru anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresDiameters.push(tireDiameter3[0].tr_id)  
      }

      let tireSpeedIndex3 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[31].toUpperCase())
      if(tireSpeedIndex3.length < 1) {
        err = 'Eroare ind. viteza anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresSpeedIndexes.push(tireSpeedIndex3[0].tsi_id)  
      }

      let tireLoadIndex3 = tireOpts.loadIndexesList.filter(li => li.load_index === el[32].toUpperCase())
      if(tireLoadIndex3.length < 1) {
        err = 'Eroare ind. sarcina anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresLoadIndexes.push(tireLoadIndex3[0].tli_id)  
      }

      let tireBrand3 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[33].toLowerCase())
      if(tireBrand3.length < 1) {       
        err = 'Eroare brand anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresBrands.push(tireBrand3[0].tb_id)  
      }
      
      if(el[34] === "") {
        err = 'Eroare model lipsa anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresModels.push(el[34])  
      }

      let tireSeason3 = capitalizeFirstLetter(el[35])      
      if(tireSeason3 === "" || (tireSeason3 !== 'Iarna' && tireSeason3 !== 'Vara' && tireSeason3 !== 'All season')) {
        err = 'Eroare sezon anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresSeasons.push(tireSeason3)  
      }
            
      if(el[36] === "") {
        err = 'Eroare DOT lipsa anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresDots.push(el[36])  
      }

      if(el[37] === "" || (el[37].toUpperCase() !== "DA" && el[37].toUpperCase() !== "NU")) {
        err = 'Eroare Janta anvelopa spate/dreapta linia ' + i; break;
      } else {
        let tireRim3 = (el[37].toUpperCase() === "DA" ? "1" : "2") 
        tiresRims.push(tireRim3)  
      }

      if(el[38] === "" || parseFloat(el[38].replace(",", ".")) < 0 || parseFloat(el[38].replace(",", ".")) > 12) {
        err = 'Eroare uzura anvelopa spate/dreapta linia ' + i; break;
      } else {
        let tireTreadUsage3 = el[38].replace(",", ".")
        tiresTreadUsages.push(tireTreadUsage3)  
      }

      /* 4th tire */
      let tireWidth4 = tireOpts.widthsList.filter(w => w.width === el[39])      
      if(tireWidth4.length < 1) {
        err = 'Eroare latime anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresWidths.push(tireWidth4[0].tw_id)  
      } 

      let tireHeight4 = tireOpts.heightsList.filter(h => h.height === el[40])
      if(tireHeight4.length < 1) {
        err = 'Eroare inaltime anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresHeights.push(tireHeight4[0].th_id)  
      }

      let tireDiameter4 = tireOpts.rimsList.filter(d => d.rim === el[41])
      if(tireDiameter4.length < 1) {
        err = 'Eroare diametru anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresDiameters.push(tireDiameter4[0].tr_id)  
      }

      let tireSpeedIndex4 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[42].toUpperCase())
      if(tireSpeedIndex4.length < 1) {
        err = 'Eroare ind. viteza anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresSpeedIndexes.push(tireSpeedIndex4[0].tsi_id)  
      }

      let tireLoadIndex4 = tireOpts.loadIndexesList.filter(li => li.load_index === el[43].toUpperCase())
      if(tireLoadIndex4.length < 1) {
        err = 'Eroare ind. sarcina anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresLoadIndexes.push(tireLoadIndex4[0].tli_id)  
      }

      let tireBrand4 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[44].toLowerCase())
      if(tireBrand4.length < 1) {       
        err = 'Eroare brand anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresBrands.push(tireBrand4[0].tb_id)  
      }
      
      if(el[45] === "") {
        err = 'Eroare model lipsa anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresModels.push(el[45])  
      }

      let tireSeason4 = capitalizeFirstLetter(el[46])      
      if(tireSeason4 === "" || (tireSeason4 !== 'Iarna' && tireSeason4 !== 'Vara' && tireSeason4 !== 'All season')) {
        err = 'Eroare sezon anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresSeasons.push(tireSeason4)  
      }
            
      if(el[47] === "") {
        err = 'Eroare DOT lipsa anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresDots.push(el[47])  
      }

      if(el[48] === "" || (el[48].toUpperCase() !== "DA" && el[48].toUpperCase() !== "NU")) {
        err = 'Eroare Janta anvelopa spate/stanga linia ' + i; break;
      } else {
        let tireRim4 = (el[48].toUpperCase() === "DA" ? "1" : "2") 
        tiresRims.push(tireRim4)  
      }

      if(el[49] === "" || parseFloat(el[49].replace(",", ".")) < 0 || parseFloat(el[49].replace(",", ".")) > 12) {
        err = 'Eroare uzura anvelopa spate/stanga linia ' + i; break;
      } else {
        let tireTreadUsage4 = el[49].replace(",", ".")
        tiresTreadUsages.push(tireTreadUsage4)  
      }


      if(el[0] === "6") {
        /* 5th tire */
        let tireWidth5 = tireOpts.widthsList.filter(w => w.width === el[50])      
        if(tireWidth5.length < 1) {
          err = 'Eroare latime anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresWidths.push(tireWidth5[0].tw_id)  
        } 

        let tireHeight5 = tireOpts.heightsList.filter(h => h.height === el[51])
        if(tireHeight5.length < 1) {
          err = 'Eroare inaltime anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresHeights.push(tireHeight5[0].th_id)  
        }

        let tireDiameter5 = tireOpts.rimsList.filter(d => d.rim === el[52])
        if(tireDiameter5.length < 1) {
          err = 'Eroare diametru anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresDiameters.push(tireDiameter5[0].tr_id)  
        }

        let tireSpeedIndex5 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[53].toUpperCase())
        if(tireSpeedIndex5.length < 1) {
          err = 'Eroare ind. viteza anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresSpeedIndexes.push(tireSpeedIndex5[0].tsi_id)  
        }

        let tireLoadIndex5 = tireOpts.loadIndexesList.filter(li => li.load_index === el[54].toUpperCase())
        if(tireLoadIndex5.length < 1) {
          err = 'Eroare ind. sarcina anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresLoadIndexes.push(tireLoadIndex5[0].tli_id)  
        }

        let tireBrand5 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[55].toLowerCase())
        if(tireBrand5.length < 1) {       
          err = 'Eroare brand anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresBrands.push(tireBrand5[0].tb_id)  
        }
        
        if(el[56] === "") {
          err = 'Eroare model lipsa anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresModels.push(el[56])  
        }

        let tireSeason5 = capitalizeFirstLetter(el[57])      
        if(tireSeason5 === "" || (tireSeason5 !== 'Iarna' && tireSeason5 !== 'Vara' && tireSeason5 !== 'All season')) {
          err = 'Eroare sezon anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresSeasons.push(tireSeason5)  
        }
              
        if(el[58] === "") {
          err = 'Eroare DOT lipsa anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresDots.push(el[58])  
        }

        if(el[59] === "" || (el[59].toUpperCase() !== "DA" && el[59].toUpperCase() !== "NU")) {
          err = 'Eroare Janta anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          let tireRim5 = (el[59].toUpperCase() === "DA" ? "1" : "2") 
          tiresRims.push(tireRim5)  
        }

        if(el[60] === "" || parseFloat(el[60].replace(",", ".")) < 0 || parseFloat(el[60].replace(",", ".")) > 12) {
          err = 'Eroare uzura anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          let tireTreadUsage5 = el[60].replace(",", ".")
          tiresTreadUsages.push(tireTreadUsage5)  
        }

        /* 6th tire */
        let tireWidth6 = tireOpts.widthsList.filter(w => w.width === el[61])      
        if(tireWidth6.length < 1) {
          err = 'Eroare latime anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresWidths.push(tireWidth6[0].tw_id)  
        } 

        let tireHeight6 = tireOpts.heightsList.filter(h => h.height === el[62])
        if(tireHeight6.length < 1) {
          err = 'Eroare inaltime anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresHeights.push(tireHeight6[0].th_id)  
        }

        let tireDiameter6 = tireOpts.rimsList.filter(d => d.rim === el[63])
        if(tireDiameter6.length < 1) {
          err = 'Eroare diametru anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresDiameters.push(tireDiameter6[0].tr_id)  
        }

        let tireSpeedIndex6 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[64].toUpperCase())
        if(tireSpeedIndex6.length < 1) {
          err = 'Eroare ind. viteza anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresSpeedIndexes.push(tireSpeedIndex6[0].tsi_id)  
        }

        let tireLoadIndex6 = tireOpts.loadIndexesList.filter(li => li.load_index === el[65].toUpperCase())
        if(tireLoadIndex6.length < 1) {
          err = 'Eroare ind. sarcina anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresLoadIndexes.push(tireLoadIndex6[0].tli_id)  
        }

        let tireBrand6 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[66].toLowerCase())
        if(tireBrand6.length < 1) {       
          err = 'Eroare brand anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresBrands.push(tireBrand6[0].tb_id)  
        }
        
        if(el[67] === "") {
          err = 'Eroare model lipsa anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresModels.push(el[67])  
        }

        let tireSeason6 = capitalizeFirstLetter(el[68])      
        if(tireSeason6 === "" || (tireSeason6 !== 'Iarna' && tireSeason6 !== 'Vara' && tireSeason6 !== 'All season')) {
          err = 'Eroare sezon anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresSeasons.push(tireSeason6)  
        }
              
        if(el[69] === "") {
          err = 'Eroare DOT lipsa anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresDots.push(el[69])  
        }

        if(el[70] === "" || (el[70].toUpperCase() !== "DA" && el[70].toUpperCase() !== "NU")) {
          err = 'Eroare Janta anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          let tireRim6 = (el[70].toUpperCase() === "DA" ? "1" : "2") 
          tiresRims.push(tireRim6)  
        }

        if(el[71] === "" || parseFloat(el[71].replace(",", ".")) < 0 || parseFloat(el[71].replace(",", ".")) > 12) {
          err = 'Eroare uzura anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          let tireTreadUsage6 = el[71].replace(",", ".")
          tiresTreadUsages.push(tireTreadUsage6)  
        }

      }

      let newVehicle = {
        fleetId: fleetId,
        regNumber : el[1].replace(/[^\w]+/gi, ""),
        vehicle_tire_count: el[0],
        vechicleBrand: el[2],
        vechicleModel: el[3],
        vehicleType:  el[4].toUpperCase(),
        vechicleMilage : el[5].replace(/[^0-9]+/gi, ""),
        vehicleTires: {
          widths: tiresWidths, 
          heights: tiresHeights, 
          diameters: tiresDiameters, 
          speedIndexes: tiresSpeedIndexes, 
          loadIndexes: tiresLoadIndexes, 
          brands: tiresBrands, 
          models: tiresModels,
          seasons: tiresSeasons,
          dots: tiresDots,
          rims: tiresRims, 
          treadUsages: tiresTreadUsages
        }
      }
      vehiclesList.push(newVehicle)
     
    }
  }
  return {err, vehiclesList}
}


export const validateParteneriBulkImport = fileContents => {
  let err=null
  let partnersList=[]
  for (const [i, el] of fileContents.entries()) {
    if(i > 0 && el.length > 1){
      if(el[0] === "") {
        err = 'Eroare: nume lipsa partener linia ' + i; break;
      } 
      if(el[1] === "") {
        err = 'Eroare: prenume lipsa partener linia ' + i; break;
      } 
      if(el[2] === "") {
        err = 'Eroare: email lipsa partener linia ' + i; break;
      }
      if(el[3] === "") {
        err = 'Eroare: parola lipsa partener linia ' + i; break;
      } 
      if(el[4] === "") {
        err = 'Eroare: telefon lipsa partener linia ' + i; break;
      } 
      if(el[5] === "") {
        err = 'Eroare: denumire companie lipsa partener linia ' + i; break;
      }
      if(el[6] === "") {
        err = 'Eroare: CUI lipsa partener linia ' + i; break;
      } 
      if(el[7] === "") {
        err = 'Eroare: registrul comertului lipsa partener linia ' + i; break;
      } 
      if(el[8] === "") {
        err = 'Eroare: adresa lipsa partener linia ' + i; break;
      }
      if(el[9] === "") {
        err = 'Eroare: judet lipsa partener linia ' + i; break;
      }
      if(el[10] === "") {
        err = 'Eroare: oras lipsa partener linia ' + i; break;
      }
      let partnerPercent = (el[11] ? el[11] : "0");
      
      let newPartner = {
        email: el[2],
        first_name: el[1],
        last_name: el[0],
        phone: el[4],
        password: el[3],
        partner_name: el[5],
        partner_gov_id: el[6],
        partner_j: el[7],
        partner_address: el[8],
        partner_region: el[9],
        partner_city: el[10],
        partner_percent: partnerPercent
      }
      partnersList.push(newPartner)
    }
  } 
  return {err, partnersList} 
}


export const validateHotelVehicleBulkImport = (fileContents, tireOpts, hotelsList, fleetId) => {
  let err=null
  let vehiclesList=[]
  for (const [i, el] of fileContents.entries()) {      
    let tiresWidths = []        
    let tiresHeights = []
    let tiresDiameters = []
    let tiresSpeedIndexes = []
    let tiresLoadIndexes = []
    let tiresBrands = []
    let tiresModels = []
    let tiresSeasons = []
    let tiresDots = []
    let tiresRims = []
    let tiresTreadUsages = []
    
    if(i > 0 && el.length > 1){
      
      if(el[0] !== "4" && el[0] !== "6") {
        err = 'Eroare nr. anvelope linia ' + i; break;
      }
      if(el[1] === "") {
        err = 'Eroare nr. inmatriculare lipsa linia ' + i; break;
      }

      if(el[2] === "") {
        err = 'Eroare Denumire Hotel lipsa linia ' + i; break;
      } 

      if(el[3] === "") {
        err = 'Eroare Localitate Hotel lipsa linia ' + i; break;
      } 

      let hotelFullName = el[2].trim() + ' - ' + el[3].trim(); 
      let tireHotelName = hotelsList.filter(h => h.hName.toUpperCase() === hotelFullName.toUpperCase())
      let tireHotelArr = []
      if(tireHotelName.length !== 1) {
        err = 'Eroare Hotel invalid linia ' + i; break;  
      } else {
        tireHotelArr = [tireHotelName[0].hId, tireHotelName[0].hId, tireHotelName[0].hId, tireHotelName[0].hId, tireHotelName[0].hId, tireHotelName[0].hId]
      }


      /* 1st tire */
      let tireWidth1 = tireOpts.widthsList.filter(w => w.width === el[4])      
      if(tireWidth1.length < 1) {
        err = 'Eroare latime anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresWidths.push(tireWidth1[0].tw_id)  
      } 

      let tireHeight1 = tireOpts.heightsList.filter(h => h.height === el[5])
      if(tireHeight1.length < 1) {
        err = 'Eroare inaltime anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresHeights.push(tireHeight1[0].th_id)  
      }

      let tireDiameter1 = tireOpts.rimsList.filter(d => d.rim === el[6])
      if(tireDiameter1.length < 1) {
        err = 'Eroare diametru anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresDiameters.push(tireDiameter1[0].tr_id)  
      }

      let tireSpeedIndex1 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[7].toUpperCase())
      if(tireSpeedIndex1.length < 1) {
        err = 'Eroare ind. viteza anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresSpeedIndexes.push(tireSpeedIndex1[0].tsi_id)  
      }

      let tireLoadIndex1 = tireOpts.loadIndexesList.filter(li => li.load_index === el[8].toUpperCase())
      if(tireLoadIndex1.length < 1) {
        err = 'Eroare ind. sarcina anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresLoadIndexes.push(tireLoadIndex1[0].tli_id)  
      }

      let tireBrand1 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[9].toLowerCase())
      if(tireBrand1.length < 1) {       
        err = 'Eroare brand anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresBrands.push(tireBrand1[0].tb_id)  
      }
      
      if(el[10] === "") {
        err = 'Eroare model lipsa anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresModels.push(el[10])  
      }

      let tireSeason1 = capitalizeFirstLetter(el[11])      
      if(tireSeason1 === "" || (tireSeason1 !== 'Iarna' && tireSeason1 !== 'Vara' && tireSeason1 !== 'All season')) {
        err = 'Eroare sezon anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresSeasons.push(tireSeason1)  
      }
            
      if(el[12] === "") {
        err = 'Eroare DOT lipsa anvelopa fata/dreapta linia ' + i; break;
      } else {
        tiresDots.push(el[10])  
      }

      if(el[13] === "" || (el[13].toUpperCase() !== "DA" && el[13].toUpperCase() !== "NU")) {
        err = 'Eroare Janta anvelopa fata/dreapta linia ' + i; break;
      } else {
        let tireRim1 = (el[13].toUpperCase() === "DA" ? "1" : "2") 
        tiresRims.push(tireRim1)  
      }

      if(el[14] === "" || parseFloat(el[14].replace(",", ".")) < 0 || parseFloat(el[14].replace(",", ".")) > 12) {
        err = 'Eroare uzura anvelopa fata/dreapta linia ' + i; break;
      } else {
        let tireTreadUsage1 = el[14].replace(",", ".")
        tiresTreadUsages.push(tireTreadUsage1)  
      }

      /* 2nd tire */
      let tireWidth2 = tireOpts.widthsList.filter(w => w.width === el[15])      
      if(tireWidth2.length < 1) {
        err = 'Eroare latime anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresWidths.push(tireWidth2[0].tw_id)  
      } 

      let tireHeight2 = tireOpts.heightsList.filter(h => h.height === el[16])
      if(tireHeight2.length < 1) {
        err = 'Eroare inaltime anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresHeights.push(tireHeight2[0].th_id)  
      }

      let tireDiameter2 = tireOpts.rimsList.filter(d => d.rim === el[17])
      if(tireDiameter2.length < 1) {
        err = 'Eroare diametru anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresDiameters.push(tireDiameter2[0].tr_id)  
      }

      let tireSpeedIndex2 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[18].toUpperCase())
      if(tireSpeedIndex2.length < 1) {
        err = 'Eroare ind. viteza anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresSpeedIndexes.push(tireSpeedIndex2[0].tsi_id)  
      }

      let tireLoadIndex2 = tireOpts.loadIndexesList.filter(li => li.load_index === el[19].toUpperCase())
      if(tireLoadIndex2.length < 1) {
        err = 'Eroare ind. sarcina anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresLoadIndexes.push(tireLoadIndex2[0].tli_id)  
      }

      let tireBrand2 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[20].toLowerCase())
      if(tireBrand2.length < 1) {       
        err = 'Eroare brand anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresBrands.push(tireBrand2[0].tb_id)  
      }
      
      if(el[21] === "") {
        err = 'Eroare model lipsa anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresModels.push(el[21])  
      }

      let tireSeason2 = capitalizeFirstLetter(el[22])      
      if(tireSeason2 === "" || (tireSeason2 !== 'Iarna' && tireSeason2 !== 'Vara' && tireSeason2 !== 'All season')) {
        err = 'Eroare sezon anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresSeasons.push(tireSeason2)  
      }
            
      if(el[23] === "") {
        err = 'Eroare DOT lipsa anvelopa fata/stanga linia ' + i; break;
      } else {
        tiresDots.push(el[23])  
      }

      if(el[24] === "" || (el[24].toUpperCase() !== "DA" && el[24].toUpperCase() !== "NU")) {
        err = 'Eroare Janta anvelopa fata/stanga linia ' + i; break;
      } else {
        let tireRim2 = (el[24].toUpperCase() === "DA" ? "1" : "2") 
        tiresRims.push(tireRim2)  
      }

      if(el[25] === "" || parseFloat(el[25].replace(",", ".")) < 0 || parseFloat(el[25].replace(",", ".")) > 12) {
        err = 'Eroare uzura anvelopa fata/stanga linia ' + i; break;
      } else {
        let tireTreadUsage2 = el[25].replace(",", ".")
        tiresTreadUsages.push(tireTreadUsage2)  
      }

      /* 3rd tire */
      let tireWidth3 = tireOpts.widthsList.filter(w => w.width === el[26])      
      if(tireWidth3.length < 1) {
        err = 'Eroare latime anvelopa spate/dreata linia ' + i; break;
      } else {
        tiresWidths.push(tireWidth3[0].tw_id)  
      } 

      let tireHeight3 = tireOpts.heightsList.filter(h => h.height === el[27])
      if(tireHeight3.length < 1) {
        err = 'Eroare inaltime anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresHeights.push(tireHeight3[0].th_id)  
      }

      let tireDiameter3 = tireOpts.rimsList.filter(d => d.rim === el[28])
      if(tireDiameter3.length < 1) {
        err = 'Eroare diametru anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresDiameters.push(tireDiameter3[0].tr_id)  
      }

      let tireSpeedIndex3 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[29].toUpperCase())
      if(tireSpeedIndex3.length < 1) {
        err = 'Eroare ind. viteza anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresSpeedIndexes.push(tireSpeedIndex3[0].tsi_id)  
      }

      let tireLoadIndex3 = tireOpts.loadIndexesList.filter(li => li.load_index === el[30].toUpperCase())
      if(tireLoadIndex3.length < 1) {
        err = 'Eroare ind. sarcina anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresLoadIndexes.push(tireLoadIndex3[0].tli_id)  
      }

      let tireBrand3 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[31].toLowerCase())
      if(tireBrand3.length < 1) {       
        err = 'Eroare brand anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresBrands.push(tireBrand3[0].tb_id)  
      }
      
      if(el[32] === "") {
        err = 'Eroare model lipsa anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresModels.push(el[32])  
      }

      let tireSeason3 = capitalizeFirstLetter(el[33])      
      if(tireSeason3 === "" || (tireSeason3 !== 'Iarna' && tireSeason3 !== 'Vara' && tireSeason3 !== 'All season')) {
        err = 'Eroare sezon anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresSeasons.push(tireSeason3)  
      }
            
      if(el[34] === "") {
        err = 'Eroare DOT lipsa anvelopa spate/dreapta linia ' + i; break;
      } else {
        tiresDots.push(el[34])  
      }

      if(el[35] === "" || (el[35].toUpperCase() !== "DA" && el[35].toUpperCase() !== "NU")) {
        err = 'Eroare Janta anvelopa spate/dreapta linia ' + i; break;
      } else {
        let tireRim3 = (el[35].toUpperCase() === "DA" ? "1" : "2") 
        tiresRims.push(tireRim3)  
      }

      if(el[36] === "" || parseFloat(el[36].replace(",", ".")) < 0 || parseFloat(el[36].replace(",", ".")) > 12) {
        err = 'Eroare uzura anvelopa spate/dreapta linia ' + i; break;
      } else {
        let tireTreadUsage3 = el[36].replace(",", ".")
        tiresTreadUsages.push(tireTreadUsage3)  
      }

      /* 4th tire */
      let tireWidth4 = tireOpts.widthsList.filter(w => w.width === el[37])      
      if(tireWidth4.length < 1) {
        err = 'Eroare latime anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresWidths.push(tireWidth4[0].tw_id)  
      } 

      let tireHeight4 = tireOpts.heightsList.filter(h => h.height === el[38])
      if(tireHeight4.length < 1) {
        err = 'Eroare inaltime anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresHeights.push(tireHeight4[0].th_id)  
      }

      let tireDiameter4 = tireOpts.rimsList.filter(d => d.rim === el[39])
      if(tireDiameter4.length < 1) {
        err = 'Eroare diametru anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresDiameters.push(tireDiameter4[0].tr_id)  
      }

      let tireSpeedIndex4 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[40].toUpperCase())
      if(tireSpeedIndex4.length < 1) {
        err = 'Eroare ind. viteza anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresSpeedIndexes.push(tireSpeedIndex4[0].tsi_id)  
      }

      let tireLoadIndex4 = tireOpts.loadIndexesList.filter(li => li.load_index === el[41].toUpperCase())
      if(tireLoadIndex4.length < 1) {
        err = 'Eroare ind. sarcina anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresLoadIndexes.push(tireLoadIndex4[0].tli_id)  
      }

      let tireBrand4 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[42].toLowerCase())
      if(tireBrand4.length < 1) {       
        err = 'Eroare brand anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresBrands.push(tireBrand4[0].tb_id)  
      }
      
      if(el[43] === "") {
        err = 'Eroare model lipsa anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresModels.push(el[43])  
      }

      let tireSeason4 = capitalizeFirstLetter(el[44])      
      if(tireSeason4 === "" || (tireSeason4 !== 'Iarna' && tireSeason4 !== 'Vara' && tireSeason4 !== 'All season')) {
        err = 'Eroare sezon anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresSeasons.push(tireSeason4)  
      }
            
      if(el[45] === "") {
        err = 'Eroare DOT lipsa anvelopa spate/stanga linia ' + i; break;
      } else {
        tiresDots.push(el[45])  
      }

      if(el[46] === "" || (el[46].toUpperCase() !== "DA" && el[46].toUpperCase() !== "NU")) {
        err = 'Eroare Janta anvelopa spate/stanga linia ' + i; break;
      } else {
        let tireRim4 = (el[46].toUpperCase() === "DA" ? "1" : "2") 
        tiresRims.push(tireRim4)  
      }

      if(el[47] === "" || parseFloat(el[47].replace(",", ".")) < 0 || parseFloat(el[47].replace(",", ".")) > 12) {
        err = 'Eroare uzura anvelopa spate/stanga linia ' + i; break;
      } else {
        let tireTreadUsage4 = el[47].replace(",", ".")
        tiresTreadUsages.push(tireTreadUsage4)  
      }


      if(el[0] === "6") {
        /* 5th tire */
        let tireWidth5 = tireOpts.widthsList.filter(w => w.width === el[48])      
        if(tireWidth5.length < 1) {
          err = 'Eroare latime anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresWidths.push(tireWidth5[0].tw_id)  
        } 

        let tireHeight5 = tireOpts.heightsList.filter(h => h.height === el[49])
        if(tireHeight5.length < 1) {
          err = 'Eroare inaltime anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresHeights.push(tireHeight5[0].th_id)  
        }

        let tireDiameter5 = tireOpts.rimsList.filter(d => d.rim === el[50])
        if(tireDiameter5.length < 1) {
          err = 'Eroare diametru anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresDiameters.push(tireDiameter5[0].tr_id)  
        }

        let tireSpeedIndex5 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[51].toUpperCase())
        if(tireSpeedIndex5.length < 1) {
          err = 'Eroare ind. viteza anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresSpeedIndexes.push(tireSpeedIndex5[0].tsi_id)  
        }

        let tireLoadIndex5 = tireOpts.loadIndexesList.filter(li => li.load_index === el[52].toUpperCase())
        if(tireLoadIndex5.length < 1) {
          err = 'Eroare ind. sarcina anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresLoadIndexes.push(tireLoadIndex5[0].tli_id)  
        }

        let tireBrand5 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[53].toLowerCase())
        if(tireBrand5.length < 1) {       
          err = 'Eroare brand anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresBrands.push(tireBrand5[0].tb_id)  
        }
        
        if(el[54] === "") {
          err = 'Eroare model lipsa anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresModels.push(el[54])  
        }

        let tireSeason5 = capitalizeFirstLetter(el[55])      
        if(tireSeason5 === "" || (tireSeason5 !== 'Iarna' && tireSeason5 !== 'Vara' && tireSeason5 !== 'All season')) {
          err = 'Eroare sezon anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresSeasons.push(tireSeason5)  
        }
              
        if(el[56] === "") {
          err = 'Eroare DOT lipsa anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          tiresDots.push(el[56])  
        }

        if(el[57] === "" || (el[57].toUpperCase() !== "DA" && el[57].toUpperCase() !== "NU")) {
          err = 'Eroare Janta anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          let tireRim5 = (el[57].toUpperCase() === "DA" ? "1" : "2") 
          tiresRims.push(tireRim5)  
        }

        if(el[58] === "" || parseFloat(el[58].replace(",", ".")) < 0 || parseFloat(el[58].replace(",", ".")) > 12) {
          err = 'Eroare uzura anvelopa spate/exterior/dreapta linia ' + i; break;
        } else {
          let tireTreadUsage5 = el[58].replace(",", ".")
          tiresTreadUsages.push(tireTreadUsage5)  
        }

        /* 6th tire */
        let tireWidth6 = tireOpts.widthsList.filter(w => w.width === el[59])      
        if(tireWidth6.length < 1) {
          err = 'Eroare latime anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresWidths.push(tireWidth6[0].tw_id)  
        } 

        let tireHeight6 = tireOpts.heightsList.filter(h => h.height === el[60])
        if(tireHeight6.length < 1) {
          err = 'Eroare inaltime anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresHeights.push(tireHeight6[0].th_id)  
        }

        let tireDiameter6 = tireOpts.rimsList.filter(d => d.rim === el[61])
        if(tireDiameter6.length < 1) {
          err = 'Eroare diametru anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresDiameters.push(tireDiameter6[0].tr_id)  
        }

        let tireSpeedIndex6 = tireOpts.speedIndexesList.filter(si => si.speed_index === el[62].toUpperCase())
        if(tireSpeedIndex6.length < 1) {
          err = 'Eroare ind. viteza anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresSpeedIndexes.push(tireSpeedIndex6[0].tsi_id)  
        }

        let tireLoadIndex6 = tireOpts.loadIndexesList.filter(li => li.load_index === el[63].toUpperCase())
        if(tireLoadIndex6.length < 1) {
          err = 'Eroare ind. sarcina anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresLoadIndexes.push(tireLoadIndex6[0].tli_id)  
        }

        let tireBrand6 = tireOpts.brandsList.filter(b => b.brand.toLowerCase() === el[64].toLowerCase())
        if(tireBrand6.length < 1) {       
          err = 'Eroare brand anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresBrands.push(tireBrand6[0].tb_id)  
        }
        
        if(el[65] === "") {
          err = 'Eroare model lipsa anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresModels.push(el[65])  
        }

        let tireSeason6 = capitalizeFirstLetter(el[66])      
        if(tireSeason6 === "" || (tireSeason6 !== 'Iarna' && tireSeason6 !== 'Vara' && tireSeason6 !== 'All season')) {
          err = 'Eroare sezon anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresSeasons.push(tireSeason6)  
        }
              
        if(el[67] === "") {
          err = 'Eroare DOT lipsa anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          tiresDots.push(el[67])  
        }

        if(el[68] === "" || (el[68].toUpperCase() !== "DA" && el[68].toUpperCase() !== "NU")) {
          err = 'Eroare Janta anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          let tireRim6 = (el[68].toUpperCase() === "DA" ? "1" : "2") 
          tiresRims.push(tireRim6)  
        }

        if(el[69] === "" || parseFloat(el[69].replace(",", ".")) < 0 || parseFloat(el[69].replace(",", ".")) > 12) {
          err = 'Eroare uzura anvelopa spate/exterior/stanga linia ' + i; break;
        } else {
          let tireTreadUsage6 = el[69].replace(",", ".")
          tiresTreadUsages.push(tireTreadUsage6)  
        }

      }

      let newVehicle = {
        fleetId: fleetId,
        regNumber : el[1].replace(/[^\w]+/gi, ""),
        vehicle_tire_count: el[0],       
        vehicleTires: {
          widths: tiresWidths, 
          heights: tiresHeights, 
          diameters: tiresDiameters, 
          speedIndexes: tiresSpeedIndexes, 
          loadIndexes: tiresLoadIndexes, 
          brands: tiresBrands, 
          models: tiresModels,
          seasons: tiresSeasons,
          dots: tiresDots,
          rims: tiresRims, 
          treadUsages: tiresTreadUsages,
          hotelId: tireHotelArr
        }
      }
      vehiclesList.push(newVehicle)
     
    }
  }
  return {err, vehiclesList}
}