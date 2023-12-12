'use client';

import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'

export default function NavBar() {
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Todo.Ai By Musa Bukhari</a>
            </div>
            <div className="flex-none">
                <ThemeSwitcher />
            </div>
        </div>
    )
}
