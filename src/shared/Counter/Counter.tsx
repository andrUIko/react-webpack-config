import React from "react";
import { decrement, increment } from "store/counter/counterSlice.ts";
import { useAppDispatch, useAppSelector } from "store/index.ts";

export const Counter = () => {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    const handleIncrement = () => dispatch(increment());
    const handleDecrement = () => dispatch(decrement());
    return (
        <div>
            <h2>Counter</h2>
            <div>
                <button onClick={handleDecrement}>-</button>
                <span aria-label="count">{count}</span>
                <button onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};
