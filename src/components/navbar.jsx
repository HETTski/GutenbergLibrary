import React, {useState} from 'react';


const Navbar = () => {
    return(
        <div className='hidden md:flex fixed flex-col top-[35%] left-0'>
        <ul>
            <li className='w-[135px] h-[80px]  flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-red-900 rounded '>
                <a className="flex justify-center items-center w-full text-[#EAC696] ml-2" href="https://en.wikipedia.org/wiki/Project_Gutenberg">
                    About Gutenberg
                </a>
            </li>
        </ul>
    </div>
    )
}
export default Navbar;