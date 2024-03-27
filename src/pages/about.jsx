import author_image from './../assets/me.jpg'

function About() {
    return (
        <div id="about-author">
            <figure id='photo-container'>
                <img id="me" src={author_image} width="300" height="400" alt="автор сайта" />
                <figcaption>ullamcorper lacus. Interdum et malesuada</figcaption>
            </figure> 
                
            <section id='author-description'>
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet erat turpis. In ut mi vitae justo maximus cursus. Morbi turpis enim, fermentum at finibus quis, egestas et nisl. Nunc lacus velit, venenatis non ultricies vel, mattis eu dui. Integer porttitor rhoncus neque. Cras venenatis enim at vehicula venenatis.</p>
                
                <p className="italic-center">
                    <span>Задир-торопыг</span>
                    <span>мирная черепаха</span>
                    <span>всех переживёт.</span>
                </p>
                
                <p>Quisque a lectus gravida, elementum arcu sed, ullamcorper lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                <p>Cras dignissim maximus enim ut tincidunt. Sed eleifend orci ac velit auctor, at hendrerit felis porttitor.</p>
                <p>Quisque a lectus gravida, elementum arcu sed, ullamcorper lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                <p>Cras dignissim maximus enim ut tincidunt. Sed eleifend orci ac velit auctor, at hendrerit felis porttitor.</p>
                <p>Quisque a lectus gravida, elementum arcu sed, ullamcorper lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                <p>Cras dignissim maximus enim ut tincidunt. Sed eleifend orci ac velit auctor, at hendrerit felis porttitor.</p>
            </section>
        </div>
    )
}

export default About