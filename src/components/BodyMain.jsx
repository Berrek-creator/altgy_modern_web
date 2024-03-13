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
            
            let import_path = '../routes/lab' + url_params.id + '/Lab' + url_params.id
            
            const module = await import(import_path);
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