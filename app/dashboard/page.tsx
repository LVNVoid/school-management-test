"use client";

import { logout } from "@/actions/auth";

export default function DashboardPage() {
    const handleLogout = async () => {
        await logout();
    };
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}