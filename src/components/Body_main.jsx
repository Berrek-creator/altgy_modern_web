import { Outlet } from 'react-router-dom';

function BodyMain() {

    return (
        <main id="front-page" className="c-container">
            <Outlet />
        </main>
    )
}

export default BodyMain