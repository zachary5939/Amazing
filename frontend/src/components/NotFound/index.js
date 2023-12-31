import './NotFound.css';
import depressing from "../../img/depressing.png";


function NotFound() {
    return (
        <div className="main-content">
            <div className="content-area">
        <div className="not-found-container">
            <img src={depressing} alt="404" className="not-found-img" />
            <h2 className="not-found-heading">The page you tried to visit doesn't exist.</h2>
        </div>
        </div>
        </div>
    );
}


export default NotFound
