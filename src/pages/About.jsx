import React from "react";
import { Layout } from "antd";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { usePageLoader } from "../hooks/usePageLoader";

import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";
import hoja from "../assets/cardSingularity.webp";

import SvgComponent from "../assets/textura.jsx";
import SingularityCard from "../components/ui/Cards/Singularity";
import Loader from "../components/layout/loader/Loader.jsx";

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
   PAGE
========================= */
const About = () => {
    const navigate = useNavigate();

    /* 🔥 HOOK LOADER (REEMPLAZA useState + useEffect) */
    const loading = usePageLoader([]);

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
                    initialSelectedKey="about"
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
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Loader size={60} color="#000" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <SingularityCard
                                image={hoja}
                                description="Colectivo de ciencia abierta y software libre. Parte del movimiento global DIYbio y la DIYbiosphere. Creamos tecnología accesible para monitorear y entender nuestro entorno."
                                social={[
                                    {
                                        label: "Instagram",
                                        url: "https://instagram.com/singularity.open",
                                    },
                                    {
                                        label: "GitHub",
                                        url: "https://github.com/Singularity-MX",
                                    },
                                    {
                                        label: "Facebook",
                                        url: "https://www.facebook.com/Singularity.py",
                                    },
                                ]}
                                onSocialClick={(s) =>
                                    window.open(s.url, "_blank")
                                }
                            />
                        </motion.div>
                    )}
                </main>
            </div>
        </Layout>
    );
};

export default About;