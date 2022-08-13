import React from 'react';
import Topbar from '../topbar/Topbar';
import Sidebar from "../common/sidebar/Sidebar";
import Feed from "../feed/Feed";
import Rightbar from "../rightbar/Rightbar";
import "./home.css";

function Home(props) {
    return (
        <div>
            <Topbar />
            <div className="home-container">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </div>
    );
}

export default Home;