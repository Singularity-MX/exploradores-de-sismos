import React from "react";
import { Layout } from "antd";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

import logo from "../assets/Logo.png";
import letras from "../assets/Singularity.png";

import SvgComponent from "../assets/textura.jsx";
import WikiModel from "../components/ui/section/InformationSection.jsx";

/* ================= BACKGROUND ================= */
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

/* ================= ANIMATIONS ================= */
const pageVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

/* ================= PAGE ================= */
const Information = () => {
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

            {/* ROOT ANIMATED WRAPPER */}
            <motion.div
                style={{
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                }}
                initial="hidden"
                animate="show"
                variants={pageVariants}
            >
                {/* ================= NAVBAR ================= */}
                <Navbar
                    items={items}
                    onNavigate={handleNavigate}
                    initialSelectedKey="information"
                    logoIcon={<img src={logo} alt="logo" style={{ height: 40 }} />}
                    logoText={<img src={letras} alt="text" style={{ height: 20 }} />}
                />

                {/* ================= MAIN ================= */}
                <main
                    style={{
                        flex: 1,
                        padding: "24px 16px",
                        overflowY: "auto",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div style={{ width: "100%", maxWidth: 900 }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key="howitworks"
                                variants={itemVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, y: 10 }}
                            >
                                <WikiModel />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </motion.div>
        </Layout>
    );
};

export default Information;