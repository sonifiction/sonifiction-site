import React from "react"
import {Link} from "gatsby"
import "../style/bulmacustom.scss"
// import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const navItems = [
    // {content:<code>Artist, Designer, and PhD Researcher in Artificial Intelligence and Music</code>, 
    //   link: "/info"},
]
const socialMediaItems = [
  {
    iconName: "fa-twitter",
    link: "https://twitter.com/c4dm",
  },
];

const Layout = ({children, nameInNav, crumbs, name, hero}) => {

  
    const navBar = (
      <nav className="column is-2-desktop has-text-left-desktop mx-0 pr-0" role="navigation" aria-label="main navigation">
        <Link to="/" className="is-uppercase logo">
          Sonifiction
          </Link>
        
        <div class="navbar-end">
            {navItems.map((item) => (
              <Link className="" to={item.link}> 
                {item.content}
                </Link>

            ))}
          </div>
      </nav>
    );

    const middleColumn=(
      <div className="column is-3-desktop has-text-left-desktop mx-0 ml-6-desktop pl-6-desktop pr-0"></div>
    )
    const endBar = (
      <nav className="column is-2-desktop has-text-left-desktop" role="navigation">
      </nav>
    );

    const svgFilters = 
      <svg className="SVGFilterStore">
          <defs >
            {/* make everything high contrast: */}
            <filter id="highContrastFilter">
              <feComponentTransfer>
                <feFuncA type="linear" slope="5" intercept="0"/>
                </feComponentTransfer>
              </filter>

            {/* make everything look like metal, should probs rename */}
            <filter id="liquidFilter" visibility="hidden">
              <feMorphology operator="dilate" radius="4" in="SourceAlpha" out="biggerAlpha"/>
              {/* <!--Create a heightmap by blurring the source: --> */}
              <feGaussianBlur stdDeviation="5" in="biggerAlpha" result="BLUR"/>

              {/* <!-- Define a lighting effect with a point light that is positioned at virtual 3D coordinates x: 40px, y: -30px, z: 200px: --> */}
              <feSpecularLighting surfaceScale="6" specularConstant="1" specularExponent="30" lighting-color="#white" in="BLUR" result="SPECULAR">
                  <fePointLight x="0" y="0" z="200" />
              </feSpecularLighting>

              {/* <!-- Cut off the parts that overlap the source graphic… --> */}
              <feComposite operator="in" in="SPECULAR" in2="SourceAlpha" result="COMPOSITE"/>

              {/* <!-- … and then merge source graphic and lighting effect: --> */}
              <feMerge>
                  <feMergeNode in="COMPOSITE"/>
              </feMerge>
              <feComposite operator="in" in="SourceGraphic" in2="COMPOSITE" result="out"/>
              </filter>
            </defs> 
          </svg>
    

    return(
      <body className="columns is-8 is-centered is-desktop px-4 mr-6-desktop my-1 is-flex-direction-row-reverse">
          {navBar}
          {middleColumn}
          
          <main className="pageContent column pr-6 mr-6 is-5-desktop">
            {children}
            </main>
            {endBar}
            {svgFilters}
          </body>
    );
}

export default Layout