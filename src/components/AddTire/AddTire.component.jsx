import React from 'react'
import './AddTire.component.scss'
import InputField from '../InputField/InputField.component'
import Filter from '../Filter/Filter.component'
import Filtreaza from '../../components/PrimaryButton/PrimaryButton.component'
import SaveBtn from '../../components/PrimaryButton/PrimaryButton.component'
import Check from '../../components/CheckBox/CheckBox.component'
import SelectBox from '../../components/SelectBox/SelectBox.component'
import SectionSubtitle from '../../components/SectionSubTitle/SectionSubTitle.component'

export default function AddTire() {
    return (
        <div className="add-tire">
            <div className="filter-tab">
                <Filter name={'Roti'}/>
            </div>
            <Check name="auto-fill" htmlFor="auto-fill"/>
            <SectionSubtitle text="Detalii anvelope"/>
            <SelectBox name="Pozitionare" color={'#1D3557'} inputBackground={'#FFD185'}/>
            <InputField type="text" label="latime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="inaltime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="diametru" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="indice viteza" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="indice sarcina" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="brand" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="model" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="sezon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="dot" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="janta" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField type="text" label="uzura" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <SaveBtn text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} />
        </div>
    )
}
