import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { useState } from 'react';

function Sidebar() {
    
    let location = useLocation();
    const [activeItem, setActiveItem] = useState(0)

    function handleDataFromChild(data) {
        setActiveItem(data)
    }

    return (
    <aside id="sidebar-right">
        <section id="last-news" className="c-container {}">
            <h3>Лабораторные работы</h3>
            <SidebarItem sendDataToParent={handleDataFromChild} id={1} className={activeItem == 1 && location.pathname.includes('labs') ? 'active-side-tab' : ''} lab_link='/labs/1' lab_title="Лабораторная работа №1" lab_desc = "кнопка и форма"/>
            <SidebarItem sendDataToParent={handleDataFromChild} id={2} className={activeItem == 2 && location.pathname.includes('labs') ? 'active-side-tab' : ''} lab_link='/labs/2' lab_title="Лабораторная работа №2" lab_desc = "React'ивная кнопка"/>
            <SidebarItem sendDataToParent={handleDataFromChild} id={3} className={activeItem == 3 && location.pathname.includes('labs') ? 'active-side-tab' : ''} lab_link='/labs/3' lab_title="Лабораторная работа №3" lab_desc = "шапка, панель, подвал, main"/>
            <SidebarItem sendDataToParent={handleDataFromChild} id={4} className={activeItem == 4 && location.pathname.includes('labs') ? 'active-side-tab' : ''} lab_link='/labs/4' lab_title="Лабораторная работа №4" lab_desc = "Маршруты, useState/Effect, Redux"/>
        </section>
    </aside>
    )
}

export default Sidebar