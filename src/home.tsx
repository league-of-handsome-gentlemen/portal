import { useEffect } from 'react';
import * as Auth from 'aws-amplify/auth';

const { VITE_API_ROOT } = import.meta.env;

export const Home = () => {
    useEffect(() => {
        Auth.fetchAuthSession().then(session => {
            const headers = new Headers();
            headers.append('Authorization', session.tokens?.idToken?.toString() ?? '');


            fetch(`${VITE_API_ROOT}`, { headers: headers }).then(async (response) => {
                console.log(await response.json());
            });
        })

    }, []);

    return <h1>Home</h1>;
}