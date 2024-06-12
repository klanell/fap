import {useEffect, useState} from "react";
import {Bounce, toast} from "react-toastify";
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import MapComponent from "./MapComponent";
import {ActionMeta, OnChangeValue} from "react-select";

// Definiert die Eigenschaften für die Komponente FriendsMapPage
type MapComponentsProps = {
    sessionId: string, // Session-ID als String
    nutzername: string; // Nutzernamen als String
}

// Interface für Benutzerdaten mit loginName, vorname und nachname
interface Benutzer {
    loginName: string; // Login-Namen des Benutzers
    vorname: string; // Vorname des Benutzers
    nachname: string; // Nachname des Benutzers
}

// Interface für Optionen im Select-Element, wobei jede Option einen Benutzerwert und eine Beschriftung hat
interface SelectOptions {
    value: Benutzer, // Wert der Option ist ein Benutzerobjekt
    label: string // Beschriftung der Option
}

// Hauptfunktion FriendsMapPage, die Props sessionId und nutzername akzeptiert
function FriendsMapPage({sessionId, nutzername}: MapComponentsProps) {
    // Zustand für die Liste der Benutzer
    const [benutzer, setBenutzer] = useState<Benutzer[]>([]);
    // Zustand für den ausgewählten Benutzer oder Benutzerliste
    const [selectedUser, setSelectedUser] = useState<Benutzer[]>();
    // Erzeugt animierte Komponenten
    const animatedComponents = makeAnimated();
    // Zustand für die Optionen im Select-Element
    const [options, setOptions] = useState<SelectOptions[]>([]);

    // Effekt zum Laden der Benutzerdaten beim Initialisieren der Komponente
    useEffect(() => {
        fetch("http://localhost:8080/FAPServer/service/fapservice/getBenutzer?login=" + nutzername + "&session=" + sessionId)
            .then(res => res.json())
            .then((res: { "benutzerliste": Benutzer[] }) => {
                setBenutzer(res.benutzerliste); // Aktualisiert den Zustand der Benutzer
            })
            .catch(error => {
                console.log(error); // Fängt Fehler ab
            });
    }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur einmal ausgeführt wird

    // Effekt zum Aktualisieren der Optionen basierend auf den aktuellen Benutzern
    useEffect(() => {
        const newOptions = benutzer.map(user => ({
            value: user,
            label: user.loginName,
        }));

        // Entfernt Duplikate durch Filtern einzigartiger loginNames und Finden der entsprechenden Optionen
        const uniqueOptions = Array.from(new Set(newOptions.map(opt => opt.value.loginName)))
            .map(loginName => {
                return newOptions.find(opt => opt.value.loginName === loginName);
            }) as SelectOptions[];

        setOptions(uniqueOptions); // Aktualisiert den Zustand der Optionen
    }, [benutzer]); // Abhängigkeit von benutzer, sodass der Effekt bei Änderungen der Benutzerliste erneut ausgeführt wird

    // Funktion zum Filtern der Optionen basierend auf einem Suchwert
    const loadOptions = (searchValue: string, callback: (arg0: SelectOptions[]) => void) => {
        setTimeout(() => {
            const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));
            callback(filteredOptions); // Ruft die Callback-Funktion mit den gefilterten Optionen auf
        }, 2000); // Verzögerung von 2000ms
    }

    // Handler für das Ändern der Auswahl im Select-Element
    const handleSelectChange = (selected: OnChangeValue<SelectOptions, true>, actionMeta: ActionMeta<SelectOptions>) => {
        if (selected) {
            setSelectedUser(selected.map(e => {
                return e.value; // Aktualisiert den Zustand des ausgewählten Benutzers
            }));
        }
    };

    // Anpassungsstile für verschiedene Teile des Select-Elements
    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected? 'black' : 'black', // Ändert die Textfarbe zu Schwarz
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'black', // Ändert die Textfarbe zu Schwarz
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: 'black', // Ändert die Textfarbe zu Schwarz
        }),
    };

    // Render-Methode der Komponente
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
            <MapComponent sessionId={sessionId} nutzername={nutzername} selectedBenutzer={selectedUser}/> {/* Überträgt die ausgewählten Benutzer an die MapComponent */}
        </div>
    )
}

// Exportiert die FriendsMapPage-Komponente
export default FriendsMapPage;
