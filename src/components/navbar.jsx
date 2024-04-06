import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return(
        <div className=' fixed w-full h-[80px] flex justify-evenly items-center px-4 bg-[#65451F] text-[#EAC696]  mx-auto  px-8 relative h-full text-4xl'>
            <a href='/'>Home </a>
            <a href='/books'> Books</a>
        </div>
    )
}
export default Navbar;