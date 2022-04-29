import React from 'react'

function NavbarLink({ path, title, classProps , goToPage , icon=null}) {
    
    return (
        <li className={`text-white text-lg ${classProps}`}>
            <button className='text-lg hover:bg-gradient-to-r  from-primary to-secondary hover:bg-clip-text hover:text-transparent transition-color ease-in duration-300 flex items-center justify-between' onClick={() => goToPage(path)}> 
                <span className='mr-4'>{icon}</span>
                   {title}
                </button>
        </li>
    )
}

export default NavbarLink