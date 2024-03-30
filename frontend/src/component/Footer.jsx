import React from "react";

function Footer() {
    const footerStyle = {
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#f59e0b",
        padding: "1rem 0",
        color: "#ffffff",
        textAlign: "center",
    };

    return (
        <footer style={footerStyle}>
            <p>&copy; 2024 Reactsite. All Right Research</p>
        </footer>
    );
}

export default Footer;
