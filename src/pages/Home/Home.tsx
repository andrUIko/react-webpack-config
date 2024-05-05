import React from "react";

interface HomeProps {
    // name: string;
}

const Home: React.FC<HomeProps> = () => {
    return (
        <div>
            <h1>Hello World</h1>
            <p>You are home</p>
        </div>
    );
};

export default Home;
