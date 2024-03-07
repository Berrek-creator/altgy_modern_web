import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { useState } from 'react';

function BodyMain() {

    // динамически импортированный компонент
    const [importedComponent, setImportedComponent] = useState()
    
    // получить параметры url
    let url_params = useParams()

    // Динамический импорт, привязанный к изменению пути в url
    useEffect(() => {
        console.log(url_params.id)
        const importComponent = async () => {
            const module = await import('../routes/lab' + url_params.id + '/Lab' + url_params.id);
            const AnotherComponent = module.default;
            setImportedComponent(<AnotherComponent />);
        };

        importComponent();
    }, [url_params]);
    
    return (
        <>
            {importedComponent}
        </>
    )
}

export default BodyMain