# 🚀 GUÍA RÁPIDA - Radio Fuera de Línea EA5JTV

## Instalación (5 minutos)

```bash
# 1. Clonar repositorio
git clone https://github.com/ManuelEA5/radio-fuera-linea.git
cd radio-fuera-linea

# 2. Hacer scripts ejecutables
chmod +x scripts/*.sh

# 3. Ejecutar instalación
sudo ./scripts/install.sh

# 4. Reiniciar Pi
sudo reboot
```

## Primer inicio

```bash
# Iniciar servicios
./scripts/start.sh

# Verificar estado
./scripts/health-check.sh
```

## Acceso a interfaz

- **URL:** `http://192.168.4.1`
- **Usuario:** `admin`
- **Contraseña:** `emergencia`

## Conectar dispositivos

1. **En móvil/tablet:**
   - Busca WiFi: `RADIO-OFFLINE`
   - Contraseña: `EMERGENCIA123`
   - Abre: `http://192.168.4.1`

2. **Por cable Ethernet:**
   - Conecta directamente a Pi
   - IP automática 192.168.4.x

## Configuración de radios

### Yaesu FT-857 (HF/VHF)
```bash
# Conectar a puerto USB
nano config/direwolf.conf
# Editar puerto serie: ADEVICE /dev/ttyUSB0
```

### Yaesu FT-8800 (VHF/UHF)
```bash
# Conectar a puerto USB
nano config/js8call.conf
# Editar puerto serie
```

### Frecuencias recomendadas

**APRS:**
- 2m: 144.800 MHz (es)
- 70cm: 430.500 MHz

**Winlink:**
- HF: 7.105 MHz (USB)
- VHF: 145.500 MHz

**JS8Call:**
- 80m: 3.578 MHz
- 40m: 7.078 MHz
- 20m: 14.078 MHz

**Meshtastic (868 MHz):**
- Automático en RedMesh Portugal

## Comandos útiles

```bash
# Ver logs en tiempo real
docker logs -f radio-web

# Ver todos los servicios
docker ps

# Reiniciar un servicio
docker restart radio-direwolf

# Hacer backup
./scripts/backup.sh

# Restaurar backup
./scripts/restore.sh data/backups/backup_YYYYMMDD_HHMMSS.tar.gz

# Parar todo
./scripts/stop.sh
```

## Troubleshooting

### WiFi no funciona
```bash
sudo ./scripts/setup-wifi.sh
sudo systemctl restart hostapd dnsmasq
```

### Puerto serie no se detecta
```bash
# Ver puertos disponibles
ls -la /dev/ttyUSB*

# Cambiar permisos
sudo chmod a+rw /dev/ttyUSB0
sudo usermod -a -G dialout $USER
```

### Contenedor no inicia
```bash
# Ver error específico
docker logs radio-direwolf

# Reconstruir
docker-compose build radio-direwolf
docker-compose up -d radio-direwolf
```

## Mantenimiento

**Cada semana:**
```bash
./scripts/backup.sh
./scripts/health-check.sh
```

**Actualizaciones:**
```bash
git pull
docker-compose build
./scripts/start.sh
```

## Contacto

- **EA5JTV:** Manuel
- **REMER:** 03T804
- **Emergencia:** 145.500 MHz
- **GitHub:** https://github.com/ManuelEA5/radio-fuera-linea

---

**¡Siempre listos para comunicar!** 📡
