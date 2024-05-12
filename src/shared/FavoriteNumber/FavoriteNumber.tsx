import { useState, useEffect } from "react";

function FavoriteNumber({ min = 1, max = 9 }) {
    const [number, setNumber] = useState(0);
    const [numberEntered, setNumberEntered] = useState(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNumber(Number(event.target.value));
        setNumberEntered(true);
    }

    const isValid = !numberEntered || (number >= min && number <= max);

    return (
        <div>
            <label
                htmlFor="favorite-number"
                data-testid="favorite-number-label">
                Favorite Number
            </label>
            <input
                id="favorite-number"
                type="number"
                value={number}
                onChange={handleChange}
            />
            {isValid ? null : <div role="alert">The number is invalid</div>}
        </div>
    );
}

export { FavoriteNumber };
