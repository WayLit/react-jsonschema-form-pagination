import React from 'react'
import { GENERIC_NAV } from '../../src/utils'

function Navs({ navs: { links }, onNavChange }) {
  let relLinks = links.filter(({ nav }) => nav !== GENERIC_NAV)
  return (
    <nav className='navbar navbar-light bg-light navbar-expand-md'>
      <div className='collapse navbar-collapse'>
        <ul className='nav navbar-nav'>
          {relLinks.map(({ nav, name, icon, isActive }, i) => (
            <li
              key={i}
              onClick={() => onNavChange(nav)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <a className='nav-link'>
                {icon && <span className={icon} aria-hidden='true' />}
                &nbsp;{name || nav}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navs
