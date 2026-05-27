import React from "react";
import { Layout } from "antd";
import Navbar from "../components/layout/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";

import SvgComponent from "../assets/textura.jsx";
import Sismografo from "../components/ui/Cards/SismografoCard.jsx";

const Background = () => (
    <div
        style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
        }}
    >
        <SvgComponent
            preserveAspectRatio="xMidYMid slice"
            style={{
                width: "100vw",
                height: "100dvh",
                opacity: 0.1,
            }}
        />
    </div>
);

const PageSismografo = () => {
    const navigate = useNavigate();
    const items = [
        { key: "home", label: "Inicio" },
        { key: "information", label: "¿Cómo funciona?" },
        { key: "tool", label: "Sismógrafo" },
        { key: "about", label: "Sobre nosotros" },
    ];

    const handleNavigate = (key) => {
        //console.log("navigate to:", key);
        navigate(`/${key === "home" ? "" : key}`);
    };

    return (
        <Layout
            style={{
                minHeight: "100dvh",
                background: "#fafafa",
                overflow: "hidden",
            }}
        >
            <Background />

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Navbar
                    items={items}
                    onNavigate={handleNavigate}
                    initialSelectedKey="home"
                    logoIcon={<img src={logo} alt="logo" style={{ height: 40 }} />}
                    logoText={<img src={letras} alt="text" style={{ height: 20 }} />}
                />

                <main
                    style={{
                        height: "calc(100dvh - 64px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px 24px",
                    }}
                >
                    <Sismografo />
                </main>
            </div>
        </Layout>
    );
};

export default PageSismografo;