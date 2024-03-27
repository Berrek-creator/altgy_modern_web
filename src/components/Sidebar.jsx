import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { useState } from 'react';

import FancyButton from "../routes/lab2/FancyButton";

import { FaWindowClose } from "react-icons/fa";

function Sidebar() {

    // названия лабораторных работ в хронологическом порядке
    const labs = [
        "кнопка и форма",
        "React'ивная кнопка",
        "шапка, панель, подвал, main",
        "Маршруты, useState/Effect, Redux",
        "Formik",
        "REST CRUD"
    ]

    const [is_open, setIsOpen] = useState(true)

    function toggleSidebar() {
        console.log("CLICK!")
        setIsOpen(is_open ? false : true)
    }
    
    let location = useLocation();
    const [activeItem, setActiveItem] = useState(0)

    function handleDataFromChild(data) {
        setActiveItem(data)
    }

    return (
    <aside id="sidebar-right" >
        <section id="last-news" className={'c-container ' + (is_open ? '' : 'collapsed')}>
            <h3>Лабораторные работы</h3>
            {labs.map((desc, i) => {
                let n = i + 1;
                return <SidebarItem key={n} sendDataToParent={handleDataFromChild} id={n} className={activeItem == n && location.pathname.includes('labs') ? 'active-side-tab' : ''} lab_link={'/labs/' + n} lab_title={"Лабораторная работа №" + n} lab_desc = {desc} />
            })}
        </section>
    </aside>
    )
}

export default Sidebar