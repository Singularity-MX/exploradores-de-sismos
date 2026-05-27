import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Typography, Tag } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const MAX_POINTS = 100;

const Sismografo = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [data, setData] = useState([]);
  const [eventDetected, setEventDetected] = useState(false);

  const canvasRef = useRef(null);

  // ================= PERMISOS =================
  const requestPermission = async () => {
    try {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
      ) {
        const response = await DeviceMotionEvent.requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
        }
      } else {
        setPermissionGranted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SENSOR =================
  useEffect(() => {
    if (!permissionGranted) return;

    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const x = acc.x || 0;
      const y = acc.y || 0;
      const z = acc.z || 0;

      const magnitude = Math.sqrt(x * x + y * y + z * z);

      const point = {
        x,
        y,
        z,
        m: magnitude,
        t: Date.now(),
      };

      setData((prev) => {
        const next = [...prev, point];
        if (next.length > MAX_POINTS) next.shift();
        return next;
      });

      // detección simple de evento
      if (magnitude > 20) {
        setEventDetected(true);
        setTimeout(() => setEventDetected(false), 500);
      }
    };

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [permissionGranted]);

  // ================= DIBUJO =================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length < 2) return;

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const drawLine = (key, color) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;

      data.forEach((p, i) => {
        const x = (i / MAX_POINTS) * W;
        const y = H / 2 - p[key] * 4;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.stroke();
    };

    drawLine("x", "#ff4d4f"); // rojo
    drawLine("y", "#52c41a"); // verde
    drawLine("z", "#1890ff"); // azul
  }, [data]);

  // ================= RESET =================
  const reset = () => {
    setData([]);
  };

  // ================= UI =================
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        style={{
          maxWidth: 500,
          margin: "20px auto",
          borderRadius: 20,
        }}
      >
        <Title level={4}>Sismómetro Virtual</Title>

        {!permissionGranted && (
          <Button type="primary" block onClick={requestPermission}>
            Activar sensor
          </Button>
        )}

        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          style={{
            width: "100%",
            background: "#000",
            borderRadius: 10,
            marginTop: 12,
          }}
        />

        <div style={{ marginTop: 12 }}>
          <Text>
            Muestras: <b>{data.length}</b>
          </Text>
        </div>

        <div style={{ marginTop: 8 }}>
          {eventDetected ? (
            <Tag color="red">Evento detectado</Tag>
          ) : (
            <Tag color="green">Normal</Tag>
          )}
        </div>

        <Button
          danger
          block
          style={{ marginTop: 12 }}
          onClick={reset}
        >
          Reiniciar
        </Button>
      </Card>
    </motion.div>
  );
};

export default Sismografo;