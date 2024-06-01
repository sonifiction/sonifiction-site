import React from "react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";

const ListItem = (props) => {
    // const textSize = props.textSize;
    const image = getImage(props.image)
    const imageAlt = props.alt
    const subtitle = props.subtitle

    return (
        <span className="listedEntry">
                {image ? 
                    (
                    <GatsbyImage 
                        className="listImage"
                        alt={imageAlt} 
                        image={image} />
                        ) 
                    : 
                    (

                    <StaticImage
                        className="placeholderListImage"
                        alt="A coloured square"
                        src="../images/me-film.jpg"
                        />
                        )
                    }
            {props.title}
            {subtitle ? 
                    (<span className="customSubheading"> {subtitle} </span>
                        ) 
                    : 
                    (<> </>)
                    }
            </span> 
        );
}

export default ListItem;