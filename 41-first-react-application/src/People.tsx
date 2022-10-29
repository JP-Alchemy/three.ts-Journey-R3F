import { useEffect, useState } from "react"

export default function People() {

    const [people, setPeople] = useState<IPerson[]>([]);

    const getPeople = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const result = await response.json();
        setPeople(result);
    }

    useEffect(() => {
        getPeople();
    }, [])

    return (
        <>
            <h2>People</h2>
            <ul>
                {people.map((person, i) => (<li key={person.id}>{person.name}</li>))}
            </ul>
        </>
    )
}

interface IPerson {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}