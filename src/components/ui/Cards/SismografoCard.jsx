import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Typography, Tag, Space, Badge, Divider, Slider } from "antd";
import { motion } from "framer-motion";
import { PlayCircleOutlined, StopOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MAX_LIVE_POINTS = 100;

const Sismografo = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [liveData, setLiveData] = useState([]);
  const [recordedData, setRecordedData] = useState([]);
  const [appMode, setAppMode] = useState('live'); 
  const [eventDetected, setEventDetected] = useState(false);
  const [maxMagnitude, setMaxMagnitude] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const canvasRef = useRef(null);

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
      setPermissionGranted(true); 
    }
  };

  useEffect(() => {
    if (!permissionGranted) return;

    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const x = acc.x || 0;
      const y = acc.y || 0;
      const z = acc.z || 0;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      const point = { x, y, z, m: magnitude, t: Date.now() };

      if (appMode === 'live' || appMode === 'recording') {
        setLiveData((prev) => {
          const next = [...prev, point];
          if (next.length > MAX_LIVE_POINTS) next.shift();
          return next;
        });
      }

      if (appMode === 'recording') {
        setRecordedData((prev) => [...prev, point]);
        setMaxMagnitude((prev) => magnitude > prev ? magnitude : prev);
      }

      if (magnitude > 15) { 
        setEventDetected(true);
        setTimeout(() => setEventDetected(false), 300);
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [permissionGranted, appMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || (appMode === 'live' && liveData.length < 2) || (appMode === 'review' && recordedData.length < 2)) return;

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();

    const dataToDraw = appMode === 'review' ? recordedData : liveData;

    const drawLine = (key, color) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      dataToDraw.forEach((p, i) => {
        const divisor = appMode === 'review' ? Math.max(dataToDraw.length - 1, 1) : MAX_LIVE_POINTS;
        const xPos = (i / divisor) * W;
        const yPos = H / 2 - (p[key] || 0) * 5; 

        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
      });

      ctx.stroke();
    };

    drawLine("x", "#ff4d4f"); 
    drawLine("y", "#52c41a"); 
    drawLine("z", "#1890ff"); 

    if (appMode === 'review' && recordedData.length > 0) {
      const idx = Math.min(selectedIndex, recordedData.length - 1);
      const scrubX = (idx / Math.max(recordedData.length - 1, 1)) * W;
      
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.moveTo(scrubX, 0);
      ctx.lineTo(scrubX, H);
      ctx.stroke();
      ctx.setLineDash([]); 

      const pt = recordedData[idx];
      if (pt) {
        const drawDot = (val, color) => {
          const scrubY = H / 2 - (val || 0) * 5;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(scrubX, scrubY, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        };
        drawDot(pt.x, "#ff4d4f");
        drawDot(pt.y, "#52c41a");
        drawDot(pt.z, "#1890ff");
      }
    }
  }, [liveData, recordedData, appMode, selectedIndex]);

  const startRecording = () => {
    setRecordedData([]);
    setMaxMagnitude(0);
    setAppMode('recording');
  };

  const stopRecording = () => {
    const peakIndex = recordedData.findIndex(p => p.m === maxMagnitude);
    setSelectedIndex(peakIndex >= 0 ? peakIndex : 0);
    setAppMode('review');
  };

  const resetToLive = () => {
    setRecordedData([]);
    setMaxMagnitude(0);
    setAppMode('live');
  };

  const currentReviewPoint = recordedData[selectedIndex] || { x: 0, y: 0, z: 0, m: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ width: "100%" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          borderRadius: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
        }}
        styles={{ body: { padding: "16px 5%" } }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>Sismómetro</Title>
          
          {permissionGranted && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
               <Badge color="#ff4d4f" text="X" />
               <Badge color="#52c41a" text="Y" />
               <Badge color="#1890ff" text="Z" />
            </div>
          )}
        </div>

        {!permissionGranted && (
          <Button type="primary" size="large" block onClick={requestPermission} style={{ height: 60, fontSize: 18 }}>
            Activar Sensores
          </Button>
        )}

        {permissionGranted && (
          <>
            <div style={{ position: "relative" }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "2/1", 
                  background: "#141414",
                  borderRadius: 12,
                  display: "block"
                }}
              />
              
              <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                {appMode === 'recording' && <Tag color="error" className="blink-anim" style={{ margin: 0 }}>🔴 Grabando</Tag>}
                {appMode === 'review' && <Tag color="blue" style={{ margin: 0 }}>Revisión</Tag>}
                {appMode === 'live' && eventDetected && <Tag color="warning" style={{ margin: 0 }}>¡Vibración!</Tag>}
              </div>
            </div>

            {appMode === 'review' ? (
              <div style={{ marginTop: 16, background: "#f5f5f5", padding: "12px", borderRadius: 8 }}>
                <Text strong>Analizar fotograma:</Text>
                <Slider 
                  min={0} 
                  max={Math.max(recordedData.length - 1, 0)} 
                  value={selectedIndex} 
                  onChange={setSelectedIndex}
                  tooltip={{ formatter: (val) => `Muestra ${val}` }}
                  style={{ margin: "12px 8px" }}
                />
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                  gap: '8px', 
                  marginTop: 12,
                  textAlign: 'center',
                  background: '#fff',
                  padding: 8,
                  borderRadius: 6
                }}>
                  <div><Text type="secondary" style={{fontSize: 12, display: 'block'}}>Eje X</Text><Text strong style={{ color: "#ff4d4f" }}>{currentReviewPoint.x.toFixed(2)}</Text></div>
                  <div><Text type="secondary" style={{fontSize: 12, display: 'block'}}>Eje Y</Text><Text strong style={{ color: "#52c41a" }}>{currentReviewPoint.y.toFixed(2)}</Text></div>
                  <div><Text type="secondary" style={{fontSize: 12, display: 'block'}}>Eje Z</Text><Text strong style={{ color: "#1890ff" }}>{currentReviewPoint.z.toFixed(2)}</Text></div>
                  <div><Text type="secondary" style={{fontSize: 12, display: 'block'}}>Fuerza Máx</Text><Text strong>{currentReviewPoint.m.toFixed(2)}</Text></div>
                </div>
              </div>
            ) : (
              <div style={{ 
                marginTop: 16, 
                display: "grid", 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 8,
                background: "#f5f5f5", 
                padding: "12px", 
                borderRadius: 8,
                textAlign: "center"
              }}>
                 <div><Text type="secondary" style={{fontSize: 12, display: 'block'}}>Estado</Text><Text strong>{appMode.toUpperCase()}</Text></div>
                 <div><Text type="secondary" style={{fontSize: 12, display: 'block'}}>Pico Máximo</Text><Text type="danger" strong>{maxMagnitude.toFixed(2)} m/s²</Text></div>
              </div>
            )}

            <Divider style={{ margin: "16px 0" }} />

            <Space style={{ width: '100%', justifyContent: 'center' }} direction="vertical" size="middle">
              {appMode === 'live' && (
                <Button type="primary" danger size="large" block icon={<PlayCircleOutlined />} onClick={startRecording} style={{ height: 50 }}>
                  Iniciar Grabación
                </Button>
              )}
              
              {appMode === 'recording' && (
                <Button size="large" block icon={<StopOutlined />} onClick={stopRecording} style={{ height: 50 }}>
                  Detener y Analizar
                </Button>
              )}

              {appMode === 'review' && (
                <Button type="primary" size="large" block icon={<ReloadOutlined />} onClick={resetToLive} style={{ height: 50 }}>
                  Volver en Vivo
                </Button>
              )}
            </Space>
          </>
        )}
      </Card>
      
      <style>{`
        @keyframes blink { 50% { opacity: 0.3; } }
        .blink-anim { animation: blink 1s infinite; }
      `}</style>
    </motion.div>
  );
};

export default Sismografo;