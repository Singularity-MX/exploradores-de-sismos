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
        { key: "", label: "Inicio" },
        { key: "information", label: "¿Cómo funciona?" },
        { key: "tool", label: "Sismómetro" },
        { key: "about", label: "Sobre nosotros" },
    ];

    const handleNavigate = (key) => {
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
                        alignItems: "center", // Centra verticalmente
                        justifyContent: "center", // Centra horizontalmente
                        padding: "16px", // Reduje un poco el padding para ganar espacio en celular
                        width: "100%",
                    }}
                >
                    {/* ENVOLTORIO PARA HACER MÁS ANCHA LA TARJETA */}
                    <div 
                        style={{ 
                            width: "100%", 
                            maxWidth: "1200px", // Puedes subirlo a 1400px si lo quieres aún más ancho en web
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Sismografo />
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default PageSismografo;