import { Outlet, Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";

function sidebar() {
    return (
    <aside id="sidebar-right">
        <section id="last-news" className="c-container">
            <h3>Лабораторные работы</h3>
            <SidebarItem lab_link='/labs/1' lab_title="Лабораторная работа №1" lab_desc = "кнопка и форма"/>
            <SidebarItem lab_link='/labs/2' lab_title="Лабораторная работа №2" lab_desc = "React'ивная кнопка"/>
            <SidebarItem lab_link='/labs/3' lab_title="Лабораторная работа №3" lab_desc = "шапка, панель, подвал, main, маршруты"/>
        </section>
    </aside>
    )
}

export default sidebar