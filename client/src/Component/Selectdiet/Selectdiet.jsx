import React from "react";

const Selectdiet = ({diet}) =>{
    return (
        <>
        {
            diet.map( d=> {
                return (
                    <option key={d.id} value={d.name}>
                        {d.name}
                    </option>
                )
            })
        }
        </>
    )
}

export default Selectdiet