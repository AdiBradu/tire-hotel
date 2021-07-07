import React, { useState } from 'react'
import api from "../../utils/Api"
import { validateParteneriBulkImport  } from "../../utils/Validators"
import ParteneriBulk from './ParteneriBulk.component'

export default function ParteneriBulkContainer() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePartnerBulkCreation = async newPartnersData => {
    return api.post('/users/partnerBulk', newPartnersData)
  }

  const handleFileUpload = async fileContents => {
    let {err, partnersList} = validateParteneriBulkImport(fileContents)
    
    if(!err && partnersList.length > 0) {
      try {
        const response  = await handlePartnerBulkCreation({partnersList})    
        if(response.status === 201) setLoading(false)
      } catch(error) {
        if(error?.response?.data?.status < 500) {
          if(error?.response?.data?.status === 400) {
            err = error?.response?.data?.errors[0].msg
          } else {
            err = error?.response?.data?.message
          }
        } else {
            err = "Creare parteneri bulk esuata"
        }
        setLoading(false)
      }
    }
    return (err ? {error: err} : {success: 'Date importate'})
  }

  return (!loading ? 
          <ParteneriBulk
            handleFileUpload={handleFileUpload}
            error={error}
            success={success}            
          />
          :
          null
          )
}