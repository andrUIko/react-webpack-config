import App from "components/App/App.tsx";
import React from "react";
import { Link } from "react-router-dom";

interface HomeProps {
    name: string;
}

const Home: React.FC<HomeProps> = ({ name }) => {
    return (
        <div>
            <h1>Hello, {name}</h1>
            <p>You are home</p>
        </div>
    );
};

export default Home;
