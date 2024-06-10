import React from 'react';
import './StandortAendernForm.css'
import {useNavigate} from "react-router-dom"


import {MdLandscape, MdLocalPostOffice, MdPlace} from "react-icons/md";
import {FaRoad} from "react-icons/fa";
import {StandortAenderFormData} from "./rest/StandortAenderFormData";
import {submitForm} from "./rest/StandortRestController";


type StandortAenderFormProps = { nutzername: string, sessionId: string }

const StandortAenderForm = ({nutzername, sessionId}: StandortAenderFormProps) => {

    const [formData, setFormData] = React.useState<StandortAenderFormData>({
        country: "",
        postalCode: "",
        place: "",
        street: "",
    })
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<String | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            };

        });
        console.log("Ping");
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form submission
        event.preventDefault();


        setLoading(true);
        setError(null);

        try {
            const data = await submitForm(formData, {nutzername, sessionId});
            console.log('Successfully changed location');
        } catch (error) {
            console.error(error)
            setError((error as Error).message);
        } finally {
            setLoading(false);
navigate('/')
        }

    };

    return (
        <div className="wrapper">
            <h1>Standort ändern</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <div className="input-container">
                        <input name="country" type="text" placeholder="Country" value={formData.country}
                               onChange={handleChange} required/>
                        <MdLandscape className='icon-standort'/>
                    </div>
                </div>
                <div className="input-box">
                    <div className="input-container">
                        <input name="postalCode" type="text" placeholder="Postal Code" value={formData.postalCode}
                               onChange={handleChange} required/>
                        <MdLocalPostOffice className='icon-standort'/>
                    </div>
                </div>
                <div className="input-box">
                    <div className="input-container">
                        <input name="place" type="text" placeholder="Place" value={formData.place}
                               onChange={handleChange} required/>
                        <MdPlace className='icon-standort'/>
                    </div>
                </div>
                <div className="input-box">
                    <div className="input-container">
                        <input name="street" type="text" placeholder="Street" value={formData.street}
                               onChange={handleChange} required/>
                        <FaRoad className='icon-standort'/>
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}</button>
            </form>
        </div>
    );
}
export default StandortAenderForm;