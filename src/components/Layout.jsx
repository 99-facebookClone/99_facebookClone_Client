import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="flex flex-col h-screen justify-between">
            <Header className="relative" />
            <div className="overflow-auto pt-1">
                <div className="flex justify-center items-center">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
