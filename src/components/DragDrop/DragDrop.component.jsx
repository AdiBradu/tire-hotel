import React, { useState, useCallback } from 'react'
import './DragDrop.component.scss'
import Upload from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../Alert/Alert.component'
import {useDropzone} from 'react-dropzone'
import { parse } from "papaparse"
import { ScaleLoader } from "react-spinners"

const override = `
  width: 100%;
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function DragDrop(props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [fileName, setFileName] = useState("")
  const [fileContents, setFileContents] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()     
      reader.onload = () => {
        const binaryStr = reader.result
        const parsedContents = parse(binaryStr)
        setSuccess(null)
        setError(null)
        setFileName(file.name)
        setFileContents(parsedContents.data)
      }
      reader.readAsText(file)
    })
  }, [])  
  const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({onDrop, accept: '.csv,.CSV', maxFiles: 1})
  const handleCsvUpload = async () => {         
    if(fileContents.length < 2 || !fileContents[1]?.[0]) {
      setSuccess(null)
      setError('Eroare! Fisierul nu contine date')
    } else {
      setLoading(true) 
      setSuccess(null)
      setError(null)
      const res = await props.handleFileUpload(fileContents)
      if(res.success) {
        setFileName("")
        setSuccess(res.success)
      } else {
        setError(res.error)  
      }
      setLoading(false) 
    }
  }

  return !loading ? (
    <>
    {fileName ?
    <div className="files-area">
      <p>{fileName}</p>
      <Upload text={'upload'} bgcolor={'#06D6A0'} onClick={handleCsvUpload} color={'#1D3557'} weight={'600'}/>
    </div>
    :
    null
    }    
    {error && <Alert alertClass="alert-error" message={error} /> } 
    {success && <Alert alertClass="alert-success" message={success} /> } 
    {fileRejections.length ? <Alert alertClass="alert-error" message="Un singur fisier permis in format .CSV" /> : null}
    <div className="drag-drop" {...getRootProps()}>      
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <>
          <p>Drag & drop your file</p>
          <p>OR <span>open</span> location</p>
          </>
      }
      
    </div>
    
    </>
    
  )
  :
  (
    <ScaleLoader
      css={override}
      height="50px"
      width="5px"
      color={"#457B9D"}
      loading={loading}
    />
  )
}
