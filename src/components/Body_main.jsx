import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import { useState } from 'react';

function BodyMain() {
    
    // получить url
    let location = useLocation()

    // динамически импортированный компонент
    const [importedComponent, setImportedComponent] = useState()
    
    // получить параметры url
    let url_params = useParams()

    // Динамический импорт, привязанный к изменению пути в url
    useEffect(() => {
        console.log(url_params.id)
        const importComponent = async () => {
            const module = await import('../routes/lab' + url_params.id + '/lab' + url_params.id);
            const AnotherComponent = module.default;
            setImportedComponent(<AnotherComponent />);
        };

        importComponent();
    }, [location.pathname]);
    
    return (
        <>
            {importedComponent}
        </>
    )
}

export default BodyMain