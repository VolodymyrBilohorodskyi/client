import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaDollarSign, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/user/user'
import { removeTokenFromLocalStorage } from '../../helpers/localstorage.helper'
import { toast } from 'react-toastify'

export const Header: FC = () => {
  const isAuth = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logOutHandler = () => {
    dispatch(logout())
    removeTokenFromLocalStorage('token')
    toast.success('You logged out')
    navigate('/')
  }

  return (
    <header className='flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm'>
      <Link to='/' className='flex items-center justify-center'>
        <FaDollarSign size={30} />
        <h1 className='text-lg'>Finance</h1>
      </Link>
      {isAuth && (
        <nav className='ml-auto mr-10 '>
          <ul className='flex items-center gap-5'>
            <li>
              <NavLink
                to={'/'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/transactions'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}
              >
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/categories'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <button className='btn btn-red' onClick={logOutHandler}>
          <span>Log out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to={'auth'} className='ml-auto py-2 text-white/50 hover:text-white'>
          Log in / Sign in
        </Link>
      )}
    </header>
  )
}
