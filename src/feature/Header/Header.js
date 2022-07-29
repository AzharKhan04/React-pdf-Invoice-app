import React  from "react";

const Header = ({data={}}) => {

    return (
        <nav className="navbar bg-default">
              <div className="container-fluid">
    <span className="navbar-brand mb-0 h1">{data.name}</span>
  </div>

  
      </nav>   
    )

}

export default Header;