import React from 'react';
import Logo from '../../common/Logo/Logo';
import MainMenu from '../../layout/MainMenu/MainMenu';
import './NavBar.scss';

const NavBar = () => {
  const links = [
    {
      path: '/',
      title: "Home"
    },
    {
      path: '/posts',
      title: "Posts"
    },
    {
      path: '/contact',
      title: "Contact"
    },
    {
      path: '/posts/new',
      title: "Add post"
    },
    {
      path: '/posts/random',
      title: 'Load random post'
    }
  ]

return (
  <nav className="navbar">
    <Logo />
    <MainMenu links={links}/>
  </nav>
)
}

export default NavBar;
