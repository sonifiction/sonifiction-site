import React from 'react';

// interactive object displaying a digital garden object based on relevance/size
// hover for text preview in title

const plantArray = [".","🌱","🪴","🌲"];

function pickPlant(plantIndex){
    return plantArray[Math.floor(plantIndex)];
} 

const Plant = (props) => {
    const size = props.size;
    return (
        // Set Heading From Hover
        <span class="is-size-3" 
        onMouseEnter={() => {
            props.callback.title(props.obj.frontmatter.title)
            if(props.obj.frontmatter.subtitle){
                props.callback.subtitle(props.obj.frontmatter.subtitle)
            }
            else{
                props.callback.subtitle("\n \n")
            }
            
            return
        }
            
            }
        onMouseLeave={() => {
            props.callback.title(props.initTitle)
            if(props.subinitTitle){
                props.callback.subtitle(props.subinitTitle)
            }
            else{
                props.callback.subtitle("\n \n")
            }
            
            return
            }}>
        {/* Render Plant Sprite */}
        {pickPlant(size)}
        </span>
    );

}

export default Plant;