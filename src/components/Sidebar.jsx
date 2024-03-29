import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { useState, useContext, useEffect } from 'react';

import { ThemeContext } from "../ThemeContext";

import { Drawer } from '@mui/material'

import FancyButton from "../routes/lab2/FancyButton";
import { FaArrowRight } from "react-icons/fa";

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

    const [is_open, toggleSidebar] = useContext(ThemeContext).sidebar
    
    let location = useLocation();
    const [activeItem, setActiveItem] = useState(0)

    // Борьба с body padding_right
    useEffect(() => {
        document.documentElement.style.overflowY = is_open ?  'hidden' : 'scroll'
    }, [is_open])

    function handleDataFromChild(data) {
        setActiveItem(data)
    }
    // className={'c-container ' + (is_open ? 'n-collapsed' : 'collapsed')}

    return (
        // disableScrollLock={true} - чтобы Padding к body не добавлялся
        <Drawer open={is_open ? true : false} onClose={toggleSidebar} anchor='right' disableScrollLock={true}>
            <aside id="sidebar-right">
                <section id="last-news" >
                    <h3>Лабораторные работы 
                        <FancyButton className="fbtn fbtn-success ma" onClick={toggleSidebar}>
                            <FaArrowRight></FaArrowRight>
                        </FancyButton>
                    </h3>
                    {labs.map((desc, i) => {
                        let n = i + 1;
                        return <SidebarItem key={n} sendDataToParent={handleDataFromChild} id={n} className={activeItem == n && location.pathname.includes('labs') ? 'active-side-tab' : ''} lab_link={'/labs/' + n} lab_title={"Лабораторная работа №" + n} lab_desc = {desc} />
                    })}
                </section>
            </aside>
        </Drawer>
    )
}

export default Sidebar