import React from "react";
import { Layout } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import HeroCard from "../components/ui/Cards/HeroCard";
import Loader from "../components/layout/loader/Loader.jsx";

import { usePageLoader } from "../hooks/usePageLoader";

import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import hoja from "../assets/imgs/ndvi.webp";
import SvgComponent from "../assets/textura.jsx";

/* =========================
   BACKGROUND
========================= */
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

/* =========================
   HOME
========================= */
const Home = () => {
    const navigate = useNavigate();

    /* 🔥 HOOK REEMPLAZA useState + useEffect */
    const loading = usePageLoader([]);

    const items = [
        { key: "", label: "Inicio" },
        { key: "information", label: "¿Cómo funciona?" },
        { key: "scan", label: "Escáner" },
        { key: "about", label: "Sobre nosotros" },
    ];

    const handleNavigate = (key) => {
        navigate(`/${key}`);
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
                    initialSelectedKey=""
                    logoIcon={<img src={logo} alt="logo" style={{ height: 40 }} />}
                    logoText={<img src={letras} alt="text" style={{ height: 20 }} />}
                />

                <main
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px 24px",
                        marginTop: 4,
                    }}
                >
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Loader size={60} color="#000000" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <HeroCard
                                image={hoja}
                                title="Exploradores de Sismos"
                                description="Taller práctico donde convertirás tu celular en un sismógrafo utilizando sus sensores internos y descubrirás cómo la ciencia ciudadana ayuda a detectar temblores."
                                meta={{
                                    "📅 Fecha": "30 de mayo del 2026",
                                    "⏰ Hora": "12:00 PM - 13:30 PM",
                                    "📍 Lugar": "IMJU Parque Hidalgo",
                                    "🧑‍🔬 Edad": "+12 años",
                                    "👥 Cupo": "45 participantes",
                                }}
                                buttonText="Comenzar"
                                onClick={() => navigate("/scan")}
                            />
                        </motion.div>
                    )}
                </main>
            </div>
        </Layout>
    );
};

export default Home;