import React from 'react'
import { GENERIC_NAV } from '../utils'

function Nav({ handleClick, isActive, name, icon }) {
  return (
    <li
      onClick={handleClick}
      className={`nav-item ${isActive ? 'active' : ''}`}
    >
      <a className='nav-link'>
        {icon && <span className={icon} aria-hidden='true' />}
        &nbsp;{name}
      </a>
    </li>
  )
}

function Navs({ navs: { links }, onNavChange }) {
  const relLinks = links.filter(({ nav }) => nav !== GENERIC_NAV)
  return (
    <ul className='nav navbar-nav'>
      {relLinks.map(({ nav, name, icon, isActive }, i) => (
        <Nav
          key={i}
          name={name || nav}
          icon={icon}
          isActive={isActive}
          handleClick={() => onNavChange(nav)}
        />
      ))}
    </ul>
  )
}

export default Navs
