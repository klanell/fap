import {useEffect, useState} from "react";
import {Bounce, toast} from "react-toastify";
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import MapComponent from "./MapComponent";
import {ActionMeta, OnChangeValue} from "react-select";

type MapComponentsProps = {
    sessionId: string,
    nutzername: string;
}

interface Benutzer {
    loginName: string;
    vorname: string;
    nachname: string;
}

interface SelectOptions {
    value: Benutzer,
    label: string
}


function FriendsMapPage({sessionId, nutzername}: MapComponentsProps) {
    const [benutzer, setBenutzer] = useState<Benutzer[]>([]);
    const [selectedUser, setSelectedUser] = useState<Benutzer[]>();
    const animatedComponents = makeAnimated();
    const [options, setOptions] = useState<SelectOptions[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/FAPServer/service/fapservice/getBenutzer?login=" + nutzername + "&session=" + sessionId)
            .then(res => res.json()).then((res: {
                                               "benutzerliste":
                                                   Benutzer[]
                                           }
        ) => {
            setBenutzer(res.benutzerliste);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        const newOptions = benutzer.map(user => ({
            value: user,
            label: user.loginName,
        }));

        // Filter duplicate options
        const uniqueOptions = Array.from(new Set(newOptions.map(opt => opt.value.loginName)))
            .map(loginName => {
                return newOptions.find(opt => opt.value.loginName === loginName);
            }) as SelectOptions[];

        setOptions(uniqueOptions);
    }, [benutzer]);

    const loadOptions = (searchValue: string, callback: (arg0: SelectOptions[]) => void) => {
        setTimeout(() => {
            const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));
            callback(filteredOptions);
        }, 2000);
    }

    const handleSelectChange = (selected: OnChangeValue<SelectOptions, true>, actionMeta: ActionMeta<SelectOptions>) => {
        if (selected) {
            setSelectedUser(selected.map(e => {
                return e.value;
            }));
        }
    };

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'black', // Change text color to black
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'black', // Change text color to black
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: 'black', // Change text color to black
        }),
    };


    return (
        <div style={{alignItems:"center"}}>
            <div style={{width: "20%"}}>
                <AsyncSelect
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultOptions={options}
                    isMulti
                    options={options}
                    loadOptions={loadOptions}
                    onChange={handleSelectChange}
                    styles={customStyles}
                />
            </div>
            <MapComponent sessionId={sessionId} nutzername={nutzername} selectedBenutzer={selectedUser}/>
        </div>
    )

}

export default FriendsMapPage;