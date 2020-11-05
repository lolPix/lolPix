import React, {FunctionComponent} from "react";
import {BrowserRouter as Router,} from 'react-router-dom';
import NavBar from "../components/nav/NavBar";
import User from "../model/user";
import Footer from "../components/Footer";
import {ToastProvider} from 'react-toast-notifications'
import Routes from "./Routes";


type Props = {
    account: User | undefined;
};

const App: FunctionComponent<Props> = ({account}: Props) => {
    return (
        <ToastProvider>
            <div className="wrapper">
                <Router>
                    <NavBar showLogo={true} account={account}/>
                    <div className="content">
                        <Routes account={account}/>
                    </div>
                    <Footer account={account}/>
                </Router>
            </div>
        </ToastProvider>
    );
};

export default App;
