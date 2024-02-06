import React from 'react';
import logoImage from '../assets/images/HomeLogo.svg';

const Header = () => {
    return (
        <div className="fixed mt-1.5 ml-2.5">
            <img src={logoImage} alt="Logo" className="w-auto" />
        </div>
    );
}

export default Header;