import { useEffect, useState } from "react";

function Phones(){

    const fajl = './public/phones.json'

    type Telefon = {
        id: number;
        nev: string;
        gyarto: string;
        ar: number;
        memoria: number;
        tarhely: number;
        kijelzo: number;
        operaciosRendszer: string;
    }

    const [telefonok, setTelefonok] = useState<Telefon[]>([]);
    const [rendezes, setRendezes] = useState("novekvo")

    useEffect( ()=>{
        async function betolt(){
            try{
                const valasz = await fetch(fajl);
                const adatok = await valasz.json();
                setTelefonok(adatok)
            }catch(err){
                console.error(err)
            }
        }
        betolt()   
    }, [])

    function rendezNovekvo(){
        const rendezett = [...telefonok].sort((a,b) =>
            a.nev.localeCompare(b.nev)
        );

        setTelefonok(rendezett);
        setRendezes("novekvo");
    }

    function rendezCsokkeno(){
        const rendezett = [...telefonok].sort((a,b) =>
            b.nev.localeCompare(a.nev)
        );

        setTelefonok(rendezett);
        setRendezes("csokkeno");
    }

    return<>
        <h2>Telefonok lista</h2>

    <button onClick={() => setRendezes(rendezNovekvo)}>Növekvő sorrend (A-Z)</button>
    <button onClick={() => setRendezes(rendezCsokkeno)}>Csökkenő sorrend (Z-A)</button>

        <table>
            <thead>
                <th>Név</th>
                <th>Gyarto</th>
                <th>Ár</th>
                <th>Memória</th>
            </thead>
            <tbody>
                {telefonok.map((telefonok) => (
                    <tr key={telefonok.id}>
                        <td>{telefonok.nev}</td>
                        <td>{telefonok.gyarto}</td>
                        <td>{telefonok.ar}</td>
                        <td>{telefonok.memoria}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>

}

export default Phones