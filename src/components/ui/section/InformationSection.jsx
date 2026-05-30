import React from "react";
import { Card, Typography, Grid } from "antd";
import { motion } from "framer-motion";
import katex from "katex";
import { useEffect, useRef } from "react";

// Sugerencias de imágenes para que agregues a tus assets:
// 1. esquema_mems.jpg -> Un diagrama sencillo de cómo es un chip acelerómetro por dentro (resortes y masitas).
// 2. grafica_ondas.png -> Una gráfica mostrando picos de actividad en 3 colores distintos (X, Y, Z).
import esquemaMems from "../../../assets/imgs/arbol.png"; 
import graficaOndas from "../../../assets/imgs/arbol.png";

const MathBlock = ({ formula }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(formula, ref.current, {
        throwOnError: false,
        displayMode: true,
      });
    }
  }, [formula]);

  return <div ref={ref} />;
};

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

/* =========================
   ANIMACIONES BASE
========================= */
const sectionVariant = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stepContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const stepVariant = {
  hidden: { opacity: 0, x: -15 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* =========================
   STEPS (ADAPTADOS A SISMOS)
========================= */
const steps = [
  {
    n: 1,
    title: "Activación de sensores",
    desc: "El usuario otorga permisos en el navegador para acceder a la API DeviceMotion, conectando la web con el hardware del dispositivo.",
  },
  {
    n: 2,
    title: "Filtrado de la gravedad",
    desc: (
      <>
        Se calibra el sensor para ignorar la fuerza constante de la gravedad ($9.8 m/s^2$) y detectar solo:
        <div style={{ marginTop: 6 }}>
          • Aceleraciones dinámicas (golpes, saltos, vibraciones).<br />
          • Cambios bruscos de posición.
        </div>
      </>
    ),
  },
  {
    n: 3,
    title: "Monitoreo triaxial",
    desc: "Se registran los datos de aceleración en 3 dimensiones (ejes X, Y, Z) a una alta frecuencia de muestreo (milisegundos).",
  },
  {
    n: 4,
    title: "Visualización en tiempo real",
    desc: "Se trazan gráficas dinámicas de cada eje, permitiendo al usuario observar visualmente la intensidad y duración de la vibración mecánica.",
  },
  {
    n: 5,
    title: "Registro de Ciencia Ciudadana",
    desc: "El sistema identifica picos anómalos. En una red real, estos metadatos se enviarían a un servidor central para triangular posibles sismos junto a otros usuarios.",
  },
];

/* =========================
   STEP ITEM (ANIMADO)
========================= */
const StepItem = ({ step }) => {
  return (
    <motion.div
      variants={stepVariant}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#111", // Puedes cambiar a un tono naranja/rojo si el branding lo requiere
          color: "#fff",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {step.n}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 6,
            textAlign: "left",
          }}
        >
          {step.title}
        </div>

        <div
          style={{
            textAlign: "justify",
            lineHeight: 1.65,
            color: "#333",
            fontSize: 14,
          }}
        >
          {step.desc}
        </div>
      </div>
    </motion.div>
  );
};

/* =========================
   SECTION WRAPPER
========================= */
const Section = ({ title, children }) => (
  <motion.div
    variants={sectionVariant}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    style={{ marginTop: 28 }}
  >
    <Title level={4} style={{ textAlign: "center", marginBottom: 16 }}>
      {title}
    </Title>
    {children}
  </motion.div>
);

/* =========================
   MAIN
========================= */
const WikiModel = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const textStyle = {
    textAlign: "justify",
    lineHeight: 1.7,
    color: "#333",
    marginTop: 30,
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 950,
        margin: "0 auto",
        borderRadius: 18,
        border: "1px solid rgba(0,0,0,0.08)",
      }}
      styles={{
        body: { padding: isMobile ? 18 : 40 },
      }}
    >
      {/* ================= INTRO ================= */}
      <Section title="Sismología y Tecnología MEMS">
        <Paragraph style={textStyle}>
          Los sismógrafos tradicionales miden el movimiento del suelo usando una masa suspendida. Hoy en día, casi todos los teléfonos inteligentes contienen sensores microelectromecánicos (MEMS) que actúan como sismómetros miniatura de alta precisión.
        </Paragraph>

        <Card style={{ marginTop: 18, borderRadius: 12, background: "#fafafa" }}>
          <Text strong>Idea clave</Text>
          <Paragraph style={{ marginTop: 6, marginBottom: 0 }}>
            Cualquier vibración mecánica o movimiento tectónico se traduce en cambios medibles de aceleración en el dispositivo, transformando tu celular en un instrumento científico.
          </Paragraph>
        </Card>
      </Section>

      {/* ================= ACELERÓMETRO ================= */}
      <Section title="Anatomía del Movimiento">
        <Paragraph style={textStyle}>
          El acelerómetro del celular registra fuerzas dinámicas a través de tres ejes ortogonales, permitiéndonos saber no solo qué tan fuerte es el movimiento, sino de dónde proviene.
        </Paragraph>

        <Card style={{ marginTop: 16, borderRadius: 12 }}>
          <Text strong>Los ejes espaciales</Text>
          <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ marginTop: 24 }}>
              <img src={esquemaMems} alt="Ejes del acelerómetro" style={{ width: "100%", borderRadius: 12 }} />
            </div>
          </motion.div>
          <div style={{ marginTop: 10 }}>
            <Text>• Eje X → Movimiento lateral (izquierda / derecha)</Text><br />
            <Text>• Eje Y → Movimiento longitudinal (adelante / atrás)</Text><br />
            <Text>• Eje Z → Movimiento vertical (arriba / abajo)</Text>
          </div>
        </Card>

        <Card style={{ marginTop: 14, borderRadius: 12, background: "#f7f7f7" }}>
          <Text>
            Las ondas sísmicas de un temblor (como las ondas P y S) excitarán estos ejes de manera distinta dependiendo de la posición del teléfono y el origen del sismo.
          </Text>
        </Card>
      </Section>

      {/* ================= MATEMÁTICAS ================= */}
      <Section title="Magnitud de Aceleración">
        <Paragraph style={textStyle}>
          Para determinar la intensidad total del movimiento, independientemente de la posición del celular, se calcula la magnitud del vector de aceleración tridimensional.
        </Paragraph>

        <div style={{ marginTop: 30 }}>
          <MathBlock formula={"a_{total} = \\sqrt{a_x^2 + a_y^2 + a_z^2}"} />
        </div>

        <Card style={{ marginTop: 18, borderRadius: 12 }}>
          <Text strong>Interpretación física</Text>
          <div style={{ marginTop: 10 }}>
            <Text>• Valores cercanos a 0 (sin gravedad) → Reposo absoluto</Text><br />
            <Text>• Picos súbitos → Impactos, vibraciones o actividad sísmica</Text>
          </div>
        </Card>

        <motion.div variants={imageVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div style={{ marginTop: 24 }}>
            <img src={graficaOndas} alt="Gráfica de sismógrafo" style={{ width: "100%", borderRadius: 12 }} />
          </div>
        </motion.div>
      </Section>

      {/* ================= STEPPER ANIMADO ================= */}
      <Section title="Uso de la Herramienta">
        <Paragraph style={textStyle}>
          El sistema opera como un flujo interactivo de adquisición y análisis de vibraciones mecánicas.
        </Paragraph>

        <motion.div
          variants={stepContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 34,
          }}
        >
          {steps.map((step) => (
            <StepItem key={step.n} step={step} />
          ))}
        </motion.div>
      </Section>

      {/* ================= Nota tecnica ================= */}
      <Section title="Consideraciones de Ciencia Ciudadana">
        <Card style={{ marginTop: 18, borderRadius: 12 }}>
          <Text strong>El poder de la red</Text>
          <Paragraph style={{ ...textStyle, marginTop: 8 }}>
            Un solo celular puede registrar vibraciones falsas (alguien moviendo la mesa). Sin embargo, si cientos de celulares en una misma zona reportan una aceleración inusual al mismo tiempo, podemos confirmar que se trata de un evento sísmico real.
          </Paragraph>
        </Card>
        <Card style={{ marginTop: 18, borderRadius: 12 }}>
          <div style={{ marginTop: 14 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Nota: Este sistema es una demostración educativa de los principios de sismología y ciencia ciudadana. No sustituye a las alertas sísmicas oficiales ni a los equipos de protección civil.
            </Text>
          </div>
        </Card>
      </Section>
    </Card>
  );
};

export default WikiModel;